import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { AboutPage } from './pages/about';
import { CommonHeader } from './pages/components/common-header';
import { HomePage } from './pages/home';

// 在进行任何操作之前，请先查看README.md文件！！！！这很重要！！！！
export default () => {
  return (
    <HashRouter>
      <CommonHeader />
      <Routes>
        {/* 通配符，找不到页面时进入该页面 */}
        <Route path="*" element={<HomePage />} />
        {/* index表示初始页面 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </HashRouter>
  );
};
