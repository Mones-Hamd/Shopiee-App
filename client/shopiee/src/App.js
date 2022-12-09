import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Form,
} from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { FetchProvider } from './context/fetchCtx';
import { AuthProvider } from './context/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PostProvider } from './context/PostsCtx';
import PostDetails from './components/Posts/PostDetails/PostDetails';
import { RecomendedPostProvider } from './context/RecommendedCtx';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
        <Router>
          <AuthProvider>
            <FetchProvider>
              <PostProvider>
                <RecomendedPostProvider>
                  <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Navigate to="/items" />} />
                      <Route path="/items" element={<Home />} />
                      <Route path="items/:id" element={<PostDetails />} />
                      <Route path="items/search" element={<Home />} />
                      <Route path="/auth" element={<Auth />} />
                    </Routes>
                    <Footer />
                  </Container>
                </RecomendedPostProvider>
              </PostProvider>
            </FetchProvider>
          </AuthProvider>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
