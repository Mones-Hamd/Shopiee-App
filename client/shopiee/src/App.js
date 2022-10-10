import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { FetchProvider } from './context/fetchCtx';
import { AuthProvider } from './context/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PostProvider } from './context/PostsCtx';
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
        <Router>
          <AuthProvider>
            <FetchProvider>
              <PostProvider>
                <Container maxWidth="xl">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                  </Routes>
                </Container>
              </PostProvider>
            </FetchProvider>
          </AuthProvider>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
