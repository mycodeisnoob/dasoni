import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import './ChatRoom.css';

interface ChatMessage {
  senderNickname: string;
  content: string;
  timestamp: Date;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { roomId } = useParams();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const member = useAppSelector((state) => state.user);

  const client = useWebSocket({
    subscribe: (client) => {
      // 기존의 채팅 메시지에 대한 구독
      client.subscribe(`/topic/room/${roomId}/chat`, (res: any) => {
        const chatMessage: ChatMessage = JSON.parse(res.body);
        console.log(chatMessage);
        setMessages((messages) => [...messages, chatMessage]);
        console.log(messages);
      });
      // 입장 및 퇴장 메시지에 대한 구독 추가
      client.subscribe(`/topic/room/${roomId}`, (res: any) => {
        const chatMessage: ChatMessage = JSON.parse(res.body);
        // 메시지 내용이 입장이나 퇴장 메시지인 경우에만 처리
        if (
          chatMessage.content.includes(`입장하셨습니다.`) ||
          chatMessage.content.includes(`퇴장하셨습니다.`)
        ) {
          setMessages((messages) => [...messages, chatMessage]);
        }
      });
    },
  });

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const element = messageRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage) {
      client?.send(
        `/app/room/${roomId}/chat`,
        {},
        JSON.stringify({
          senderNickname: member.nickname,
          content: newMessage,
          timestamp: new Date(),
        }),
      );
      console.log(member);
      console.log(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-room">
      <div className="message-container" ref={messageRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${member.nickname === msg.senderNickname ? 'message-own' : ''}`}
          >
            <strong>{msg.senderNickname}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </div>
  );
};

export default ChatRoom;
