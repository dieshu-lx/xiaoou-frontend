import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { DraggableSplitLayout } from './base-components/layouts/draggable-split-layout';
import { ChatPage } from './modules/chat/pages';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
import { SocketDemoPage } from './pages/socket-demo';

// 在进行任何操作之前，请先查看README.md文件！！！！这很重要！！！！
export default () => {
  return (
    <HashRouter>
      <DraggableSplitLayout left={<div>left</div>}>
        <Routes>
          {/* 通配符，找不到页面时进入该页面 */}
          <Route path="*" element={<HomePage />} />
          {/* index表示初始页面 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/socket" element={<SocketDemoPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </DraggableSplitLayout>
    </HashRouter>
  );
};
