import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

export default App;

