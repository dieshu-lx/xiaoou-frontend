import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { ISafeAny } from '@/type';

// 定义组件
export const SocketDemoPage = () => {
  const socketRef = useRef<Socket | null>(null);
  const rtcRef = useRef<RTCPeerConnection | null>(null); // 使用小写首字母缩写
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const userIdRef = useRef<string | null>(null);
  const [remoteId, setRemoteId] = useState('');

  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  }; // 配置STUN服务器

  useEffect(() => {
    initializeUserId(); // 初始化用户ID
    connectToServer(); // 连接到服务器

    return () => disconnectFromServer(); // 清理连接
  }, []);

  /**
   * 初始化用户ID
   */
  const initializeUserId = () => {
    if (!userIdRef.current) {
      userIdRef.current = generateRandomId();
    }
  };

  /**
   * 生成随机ID
   * @returns string - 随机生成的字符串ID
   */
  const generateRandomId = () => Math.random().toString(36).substring(2);

  /**
   * 连接至服务器
   */
  const connectToServer = () => {
    try {
      const socket = io('ws://localhost:3000/socket');
      socketRef.current = socket;

      socket.on('connect', handleConnect);
      socket.on('message', handleMessage);
      socket.on('called', handleCalled);
      socket.on('ice', handleIceCandidate);
      socket.on('error', handleError);
    } catch (err) {
      console.error('连接失败:', err);
    }
  };

  /**
   * 断开服务器连接
   */
  const disconnectFromServer = () => {
    socketRef.current?.close();
  };

  /**
   * 处理连接事件
   */
  const handleConnect = () => {
    console.log('WebSocket connection opened');
    socketRef.current?.emit('register', userIdRef.current);
  };

  /**
   * 处理消息接收事件
   * @param event - 接收到的消息对象
   */
  const handleMessage = (event: ISafeAny) => {
    console.log('Message received:', event);
  };

  const handleIceCandidate = (data: ISafeAny) => {
    console.log('ICE candidate received:', data);
    const iceCandidate = new RTCIceCandidate(data.ice);
    rtcRef.current
      ?.addIceCandidate(iceCandidate)
      .then(() => {
        console.log('ICE candidate added:', iceCandidate);
      })
      .catch((error) => {
        console.error('Error adding ICE candidate:', error);
      });
  };

  /**
   * 处理呼叫接收事件
   * @param event - 呼叫相关的数据
   */
  const handleCalled = async (event: ISafeAny) => {
    console.log('Call received:', event);
    if (event.sdp) {
      setupRtcPeerConnection(event);
    }
  };

  /**
   * 设置RTC Peer Connection
   * @param event - 包含SDP信息的对象
   */
  const setupRtcPeerConnection = async (event: ISafeAny) => {
    try {
      rtcRef.current = new RTCPeerConnection(configuration);

      // 设置onicecandidate事件处理
      rtcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(remoteId);
          // 从本地发送ICE候选者到远端用户
          socketRef.current?.emit('iceCandidate', {
            from: userIdRef.current,
            to: remoteId,
            ice: event.candidate,
          });
        }
      };

      rtcRef.current.ontrack = (e) => {
        remoteStreamRef.current = e.streams[0];
        remoteVideoRef.current!.srcObject = remoteStreamRef.current;
      };
      await rtcRef.current.setRemoteDescription(new RTCSessionDescription(event.sdp));

      if (event.sdp.type === 'offer') {
        const answer = await rtcRef.current.createAnswer();
        await rtcRef.current.setLocalDescription(answer);
        sendSdp(answer);
      } else if (event.ice) {
        rtcRef.current.addIceCandidate(new RTCIceCandidate(event.ice));
      }
    } catch (err) {
      console.error('设置RTC Peer Connection时发生错误:', err);
    }
  };

  /**
   * 发送SDP信息
   * @param answer - SDP描述信息
   */
  const sendSdp = (answer: RTCSessionDescriptionInit) => {
    socketRef.current?.emit('call', {
      from: userIdRef.current,
      to: remoteId,
      sdp: answer,
    });
  };

  /**
   * 错误处理
   * @param error - 错误事件
   */
  const handleError = (error: ErrorEvent) => {
    console.error('WebSocket error:', error);
  };

  /**
   * 拨打按钮点击事件处理器
   */
  const onCall = async () => {
    try {
      await requestUserMedia();
      createAndSendOffer();
    } catch (err) {
      console.error('拨打电话过程中出错:', err);
    }
  };

  /**
   * 请求媒体设备权限
   */
  const requestUserMedia = async () => {
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current!.srcObject = localStreamRef.current;
  };

  /**
   * 创建并发送Offer
   */
  const createAndSendOffer = async () => {
    try {
      rtcRef.current = new RTCPeerConnection(configuration);
      addLocalTracks(rtcRef.current!, localStreamRef.current!);

      rtcRef.current.ontrack = (event) => {
        if (!remoteVideoRef.current) {
          remoteVideoRef.current!.srcObject = event.streams[0];
        }
      };

      const offer = await rtcRef.current.createOffer();
      await rtcRef.current.setLocalDescription(offer);
      sendSdp(offer);
    } catch (err) {
      console.error('创建并发送Offer时出错:', err);
    }
  };

  /**
   * 添加本地音视频轨道到Peer Connection
   * @param peerConn - RTCPeerConnection实例
   * @param stream - MediaStream实例
   */
  const addLocalTracks = (peerConn: RTCPeerConnection, stream: MediaStream) =>
    stream?.getTracks().forEach((track) => peerConn.addTrack(track, stream));

  /**
   * 挂断按钮点击事件处理器
   */
  const onHangup = () => {
    hangUp();
  };

  /**
   * 结束通话
   */
  const hangUp = () => {
    rtcRef.current?.close();
    rtcRef.current = null; // 清空引用
  };

  return (
    <div>
      <div>
        <input onChange={(e) => setRemoteId(e.target.value)} type="text" id="remoteId" placeholder="输入远程用户的ID" />
        <button onClick={onCall}>拨打</button>
        <button onClick={onHangup}>挂断</button>
      </div>

      <div>
        <video ref={localVideoRef} id="localVideo" width="100%" height="100%" autoPlay playsInline muted />
        <video ref={remoteVideoRef} id="remoteVideo" width="100%" height="100%" autoPlay playsInline />
      </div>
    </div>
  );
};
