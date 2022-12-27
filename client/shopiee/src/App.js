import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './Pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

import { AuthProvider } from './context/AuthCtx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PostsProvider } from './context/PostsCtx';
import PostDetails from './components/Posts/PostDetails/PostDetails';
import { RecomendedPostProvider } from './context/RecommendedCtx';
import Registration from './Pages/Registeration/Registration';
import PostItem from './Pages/PostItem/PostItem';
import { ConfirmationMessageProvider } from './context/ConMessageCtx';
import { NotificationsProvider } from './context/NotificationsCtx';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
        <Router>
          <AuthProvider>
            <PostsProvider>
              <RecomendedPostProvider>
                <ConfirmationMessageProvider>
                  <NotificationsProvider>
                    <div className="main">
                      <Navbar />

                      <Routes>
                        <Route path="/" element={<Navigate to="/items" />} />
                        <Route path="/items" element={<Home />} />
                        <Route path="/post" element={<PostItem />} />
                        <Route path="items/:id" element={<PostDetails />} />
                        <Route path="items/search" element={<Home />} />
                        <Route path="/auth" element={<Registration />} />
                      </Routes>
                    </div>
                  </NotificationsProvider>
                </ConfirmationMessageProvider>
              </RecomendedPostProvider>
            </PostsProvider>
          </AuthProvider>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
