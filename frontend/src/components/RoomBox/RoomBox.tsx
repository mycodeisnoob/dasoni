import React, { useState } from 'react';
import titleImg from '../../assets/image/title_img.png';
import maleIcon from '../../assets/image/male_icon.png';
import femaleIcon from '../../assets/image/female_icon.png';
import FilledButton from '../Button/FilledButton';
import './RoomBox.css';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';

export type RoomBoxProps = {
  roomId: number; // room을 구분하는 id
  title: string; // 방 제목
  malePartyMemberCount: number; // 현재 남자 참가인원
  femalePartyMemberCount: number; // 현재 여자 참가인원
  malePartyAvgRating: number; // 참가한 남자 평균 레이팅
  femalePartyAvgRating: number; // 참가한 여자 평균 레이팅
  megiAcceptable: boolean; // 메기 입장 가능 여부
};

type GenderInfoProps = {
  genderIcon: string; // 성별 아이콘
  genderCount: number; // 성별  참여 인원
  genderAvgRank: number; // 성별 평균 등급
  fullCount: number; // 최대 참여 가능 인원수
};

const styles = {
  //FilledButton 컴포넌트 일반 style
  basic: {
    height: '2rem',
    borderRadius: '6rem',
    background: '#EC5E98',
    color: '#FFF',
    textAlign: 'center',
    fontWize: '0.5rem',
    fontWeight: 500,
    padding: '0.5rem 0.8rem',
  },
  //Filledbutton 컴포넌트 메기 입장 style
  megi: {
    height: '2rem',
    borderRadius: '6rem',
    background: '#ECC835',
    color: '#FFF',
    textAlign: 'center',
    fontWize: '0.5rem',
    fontWeight: 500,
    padding: '0.5rem 0.8rem',
  },
  //FilledButton 컴포넌트 disabled style
  disabled: {
    height: '2rem',
    borderRadius: '6rem',
    background: '#8B8B8B',
    color: '#FFF',
    textAlign: 'center',
    fontWize: '0.5rem',
    fontWeight: 500,
    padding: '0.5rem 0.8rem',
  },
};

const FULL_COUNT = 3; // 최대 가능 인원수
const MEGI_FULL_COUNT = 4; // 메가 참여 가능 방 최대 가능 인원수

// 성별 정보 컴포넌트
function GenderInfo({ genderIcon, genderCount, genderAvgRank, fullCount }: GenderInfoProps) {
  return (
    <div className="gender-info">
      <img className="item" src={genderIcon} alt="성별 아이콘" />
      <span className="count item">
        {genderCount}/{fullCount}
      </span>
      <span className="avg-rank item">평균 등급 {genderAvgRank}</span>
    </div>
  );
}

function RoomBox({
  roomId,
  title,
  malePartyMemberCount,
  femalePartyMemberCount,
  malePartyAvgRating,
  femalePartyAvgRating,
  megiAcceptable,
}: RoomBoxProps) {
  const [isFull, setIsFull] = useState(false); // 참여 인원이 가득 찼는지 저장하는 state
  // TODO : isFull 확인하는 로직

  const member = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  // 입장하기
  const onClickEnter = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFull) {
      alert('더 이상 입장 할 수 없습니다.');
      return;
    } else {
      console.log('입장하기');
      try {
        // TODO : user state에 있는 memberId로 바꾸기
        const res = await axios.post(`/rooms/${roomId}/members/1`);
        console.log(res);

        if (res.status === 200) {
          console.log('입장 성공');
          navigate(`/waiting-room/${roomId}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={isFull ? 'room-box disabled' : 'room-box'}>
      <div className="room-header">
        <div className="title-box">
          <img src={titleImg} alt="하트 이미지" />
          <h4>{title}</h4>
        </div>
        {megiAcceptable && femalePartyMemberCount + malePartyAvgRating === 2 * FULL_COUNT ? (
          <FilledButton
            style={isFull ? styles.disabled : styles.megi}
            content="메기 입장하기"
            handleClick={onClickEnter}
          />
        ) : null}

        {!megiAcceptable && femalePartyMemberCount + malePartyMemberCount < 2 * FULL_COUNT ? (
          <FilledButton
            style={isFull ? styles.disabled : styles.basic}
            content="입장하기"
            handleClick={onClickEnter}
          />
        ) : null}
      </div>
      <div className="content">
        <GenderInfo
          genderIcon={maleIcon}
          genderCount={malePartyMemberCount}
          genderAvgRank={malePartyAvgRating}
          fullCount={megiAcceptable ? MEGI_FULL_COUNT : FULL_COUNT}
        />
        <GenderInfo
          genderIcon={femaleIcon}
          genderCount={femalePartyMemberCount}
          genderAvgRank={femalePartyAvgRating}
          fullCount={megiAcceptable ? MEGI_FULL_COUNT : FULL_COUNT}
        />
      </div>
    </div>
  );
}

export default RoomBox;