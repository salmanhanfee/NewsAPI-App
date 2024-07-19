import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/NewsAPI-App" element={<BlogPostList />} />
          <Route path="/NewsAPI-App/post/:id" element={<BlogPostDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
