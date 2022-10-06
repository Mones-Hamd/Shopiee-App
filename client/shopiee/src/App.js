import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { PostsProvider } from './context/PostsCtx';
function App() {
  return (
    <>
      <Router>
        <PostsProvider>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </PostsProvider>
      </Router>
    </>
  );
}

export default App;
