import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Management from './pages/Management';
import Details from './pages/Details';


export default function App  () {
  return (
    <Router>
       <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/details/:productId" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
};
