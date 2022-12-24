import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './Pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { FetchProvider } from './context/fetchCtx';
import { AuthProvider } from './context/AuthCtx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PostsProvider } from './context/PostsCtx';
import PostDetails from './components/Posts/PostDetails/PostDetails';
import { RecomendedPostProvider } from './context/RecommendedCtx';
import Footer from './components/Footer/Footer';
import Registration from './Pages/Registeration/Registration';
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
        <Router>
          <AuthProvider>
            <FetchProvider>
              <PostsProvider>
                <RecomendedPostProvider>
                  <div className="main">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Navigate to="/items" />} />
                      <Route path="/items" element={<Home />} />
                      <Route path="items/:id" element={<PostDetails />} />
                      <Route path="items/search" element={<Home />} />
                      <Route path="/auth" element={<Registration />} />
                    </Routes>
                    <Footer />
                  </div>
                </RecomendedPostProvider>
              </PostsProvider>
            </FetchProvider>
          </AuthProvider>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
