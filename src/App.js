import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Management from './pages/Management';
import Details from './pages/Details';

// Tạo một component để hiển thị header nếu đường dẫn khác '/'
export const ShowHeader = () => {
  const location = useLocation();
  if (location.pathname !== '/') return <Header />;
  else return <></>;
};

// Tạo một component tương tự để hiển thị footer
export const ShowFooter = () => {
  const location = useLocation();
  if (location.pathname !== '/') return <Footer />;
  else return <></>;
};

export default function App  () {
  return (
    <Router>
       <ShowHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/details/:productId" element={<Details />} />
      </Routes>
      <ShowFooter />
    </Router>
  );
};
