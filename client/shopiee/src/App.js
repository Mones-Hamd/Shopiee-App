import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

import { FetchProvider } from './context/fetchCtx';
function App() {
  return (
    <>
      <Router>
        <FetchProvider>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </FetchProvider>
      </Router>
    </>
  );
}

export default App;
