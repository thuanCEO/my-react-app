import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Management from "./pages/Management";
import Details from "./pages/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/home";

// Tạo một component để hiển thị header nếu đường dẫn khác '/'
export const ShowHeader = () => {
  const location = useLocation();
  if (location.pathname !== "/") return <Header />;
  else return <></>;
};

// Tạo một component tương tự để hiển thị footer
export const ShowFooter = () => {
  const location = useLocation();
  if (location.pathname !== "/") return <Footer />;
  else return <></>;
};

export default function App() {
  return (
    <Router>
      <ShowHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:productId" element={<Details />} />
      </Routes>
      <ShowFooter />
    </Router>
  );
}
