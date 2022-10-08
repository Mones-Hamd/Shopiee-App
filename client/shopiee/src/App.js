import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { FetchProvider } from './context/fetchCtx';
import { AuthProvider } from './context/Auth';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <FetchProvider>
            <Container maxWidth="xl">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </Container>
          </FetchProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
