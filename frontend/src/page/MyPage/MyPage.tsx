import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import RankAvartar from '../../components/Avarta/RankAvartar/RackAvartar';
import ExpPointBar from '../../components/Element/ExpPointBar';
import './MyPage.css';
import MyProfile from '../../components/MyPage/MyProfile';
import MyProfileModify from '../../components/MyPage/Modify/MyProfileModify';
import MyProfileChangePw from '../../components/MyPage/ChangePassword/MyProfileChangePw';
import { useAppSelector } from '../../app/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setHelpModalVisible } from '../../app/slices/waitingSlice';
import HelpModal from '../../components/Modal/HelpModal/HelpModal';
import convertScoreToPercent from '../../utils/convertScoreToPercent';

type SideBarProps = {
  points: number | undefined; // 현재 유저의 포인트
  match: number | undefined; // 지금까지 참여한 미팅 횟수
  setType: (type: string) => void; //set state 함수
};

function SideBar({ match, points, setType }: SideBarProps) {
  const { rating, matchCnt, profileImageSrc } = useAppSelector((state) => state.user);
  const changePw = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setType('changePw');
  };

  return (
    <div className="bar">
      <div className="mobile">
        <div className="top">
          <div className="imag-container">
            <RankAvartar profileSrc={profileImageSrc} point={points} />
          </div>
        </div>
        <div className="info">
          <div className="sidebar_signal">
            <p className="title"> Signal</p>
            <ExpPointBar percent={convertScoreToPercent(rating || 0)} points={points} />
          </div>
          <div className="sidebar_match">
            <p className="title">Match</p>
            <h3>{match}</h3>
          </div>
        </div>
      </div>
      <div className="my-side-bar">
        <div className="top">
          <div className="imag-container">
            <RankAvartar profileSrc={profileImageSrc} point={points} />
          </div>
        </div>
        <div className="info">
          <div className="sidebar_signal">
            <p className="title"> Signal</p>
            <ExpPointBar percent={convertScoreToPercent(rating || 0)} points={rating} />
          </div>
          <div className="sidebar_match">
            <p className="title">Match</p>
            <h3>{matchCnt}</h3>
          </div>
        </div>
        <footer className="footer">
          <a href="/" onClick={changePw}>
            비밀번호 변경
          </a>
        </footer>
      </div>
    </div>
  );
}

function MyPage() {
  const [type, setType] = useState('read');
  const dispatch = useDispatch();
  const helpModalVisible = useSelector((state: RootState) => state.waitingRoom.helpModalVisible);
  const { rating, matchCnt } = useAppSelector((state) => state.user);
  const handleHelpModalToggle = () => {
    dispatch(setHelpModalVisible(!helpModalVisible));
  };

  let content = null;
  if (type === 'read') content = <MyProfile setType={setType} />;
  else if (type === 'modify') content = <MyProfileModify setType={setType} />;
  else if (type === 'changePw') content = <MyProfileChangePw setType={setType} />;
  return (
    <div className="mypage">
      <Header onModalToggle={handleHelpModalToggle} />
      <main>
        <SideBar points={rating} match={matchCnt} setType={setType} />
        {content}
      </main>
      {/* HelpModal 컴포넌트를 렌더링합니다. */}
      {helpModalVisible && <HelpModal onClose={handleHelpModalToggle} />}
    </div>
  );
}

export default MyPage;
