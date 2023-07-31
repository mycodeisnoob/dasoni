import React, { useRef, useState } from 'react';
// import '../Modal.css';
import './OpenRoomModal.css';
import NoLabelInput from '../../Input/NoLabelInput/NoLabelInput';
import Button from '../../Button/FilledButton';
import { useAppDispatch } from '../../../app/hooks';
// import { setUserAsync } from '../../../app/modules/user';

interface OpenRoomModalProps {
  onClose: () => void;
}

const styles = {
  button: {
    width: '10rem',
    height: '4rem',
    flexShrink: '0',
    borderRadius: '1.25rem',
    background: '#EC5E98',
    color: '#FFF',
    fontSize: '1.75rem',
    fontStyle: 'normal',
    fontWeight: '700',
  },
  input: {
    width: '34.125rem',
    height: '4.125rem',
    flexShrink: '0',
    borderRadius: '0.8rem',
    border: '3px solid #D9D9D9',
    background: '#FFF',
    color: '#898989',
    fontSize: '1rem',
    margin: '0.5rem 0',
    padding: '0.5rem 0.7rem',
    marginleft: 'auto',
  },
  //   checkbox: {
  //     width: '2.125rem',
  //     height: '2.125rem',
  //     flexshrink: '0',
  //   },
};

function OpenRoomModal({ onClose }: OpenRoomModalProps) {
  const [roomTitle, setRoomTitle] = useState('');
  const [megiAcceptable, setMegiAcceptable] = useState(false);
  const [ratingLimit, setRatingLimit] = useState<string>('');

  const handleChangeRoomTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomTitle(event.target.value);

  const handleChangeMegiAcceptable = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMegiAcceptable(event.target.checked);

  const handleChangeRatingLimit = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setRatingLimit(event.target.value);

  const dispatch = useAppDispatch();

  const OpenRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = {
      roomTitle: roomTitle,
      megiAcceptable: megiAcceptable,
      ratingLimit: ratingLimit,
    };
    // 백엔드로 data 디스패치 하는 API 호출

    console.log(data);
  };

  return (
    <div className="openroom-modal">
      <div className="header">
        방만들기
        <div className="close-button">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="box">
        <div className="box-content">
          <NoLabelInput
            style={styles.input}
            type="text"
            value={roomTitle}
            handleChange={handleChangeRoomTitle}
            placeholer="방 제목을 입력하세요."
          />
          <h1>메기 설정</h1>
          <div className="megi">
            <div>
              <label
                htmlFor="megiAcceptableCheckbox"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span style={{ marginLeft: '8px' }}>메기 입장 가능</span>
                {megiAcceptable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M17 0C7.616 0 0 7.616 0 17C0 26.384 7.616 34 17 34C26.384 34 34 26.384 34 17C34 7.616 26.384 0 17 0ZM17 30.6C9.486 30.6 3.4 24.514 3.4 17C3.4 9.486 9.486 3.4 17 3.4C24.514 3.4 30.6 9.486 30.6 17C30.6 24.514 24.514 30.6 17 30.6Z"
                      fill="#A45097"
                    />
                    <path
                      d="M17 25.5C21.6944 25.5 25.5 21.6944 25.5 17C25.5 12.3056 21.6944 8.5 17 8.5C12.3056 8.5 8.5 12.3056 8.5 17C8.5 21.6944 12.3056 25.5 17 25.5Z"
                      fill="#A45097"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M17 0C7.616 0 0 7.616 0 17C0 26.384 7.616 34 17 34C26.384 34 34 26.384 34 17C34 7.616 26.384 0 17 0ZM17 30.6C9.486 30.6 3.4 24.514 3.4 17C3.4 9.486 9.486 3.4 17 3.4C24.514 3.4 30.6 9.486 30.6 17C30.6 24.514 24.514 30.6 17 30.6Z"
                      fill="#A45097"
                    />
                  </svg>
                )}
              </label>
              <input
                type="checkbox"
                id="megiAcceptableCheckbox"
                checked={megiAcceptable}
                onChange={handleChangeMegiAcceptable}
              />
            </div>
            <div>
              <label
                htmlFor="megiUnacceptableCheckbox"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span style={{ marginLeft: '8px' }}>메기 입장 불가</span>
                {!megiAcceptable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M17 0C7.616 0 0 7.616 0 17C0 26.384 7.616 34 17 34C26.384 34 34 26.384 34 17C34 7.616 26.384 0 17 0ZM17 30.6C9.486 30.6 3.4 24.514 3.4 17C3.4 9.486 9.486 3.4 17 3.4C24.514 3.4 30.6 9.486 30.6 17C30.6 24.514 24.514 30.6 17 30.6Z"
                      fill="#A45097"
                    />
                    <path
                      d="M17 25.5C21.6944 25.5 25.5 21.6944 25.5 17C25.5 12.3056 21.6944 8.5 17 8.5C12.3056 8.5 8.5 12.3056 8.5 17C8.5 21.6944 12.3056 25.5 17 25.5Z"
                      fill="#A45097"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M17 0C7.616 0 0 7.616 0 17C0 26.384 7.616 34 17 34C26.384 34 34 26.384 34 17C34 7.616 26.384 0 17 0ZM17 30.6C9.486 30.6 3.4 24.514 3.4 17C3.4 9.486 9.486 3.4 17 3.4C24.514 3.4 30.6 9.486 30.6 17C30.6 24.514 24.514 30.6 17 30.6Z"
                      fill="#A45097"
                    />
                  </svg>
                )}
              </label>
              <input
                type="checkbox"
                id="megiUnacceptableCheckbox"
                checked={!megiAcceptable}
                onChange={() => setMegiAcceptable(!megiAcceptable)}
              />
            </div>
          </div>
          <h1>랭크 제한 설정</h1>
          <select value={ratingLimit} onChange={handleChangeRatingLimit}>
            <option value="">랭크를 선택하세요.</option>
            <option value="노랑">하얀</option>
            <option value="노랑">노랑</option>
            <option value="초록">초록</option>
            <option value="보라">보라</option>
            <option value="파랑">파랑</option>
            <option value="빨강">빨강</option>
            <option value="무지개">무지개</option>
          </select>
          {ratingLimit && <p>{`해당 랭크 이상만 입장 가능: ${ratingLimit}`}</p>}
          <div className="modal-background" />
        </div>
        <div className="openroom-button">
          <Button style={styles.button} content="개설하기" handleClick={OpenRoom} />
        </div>
      </div>
    </div>
  );
}

export default OpenRoomModal;
