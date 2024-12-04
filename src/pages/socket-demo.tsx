import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketDemoPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('ws://localhost:3000/socket');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connection opened');
    });

    socket.on('message', (event) => {
      setMessages((prevMessages) => [...prevMessages, event]);
      console.log('Message received:', event);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = () => {
    socketRef.current?.emit('message', inputValue);
  };

  return (
    <div>
      <h1>Messages from Server</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
