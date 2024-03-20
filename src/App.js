import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Login from "./components/Login/Login";
import SignUp from './components/SignUp/SignUp';
import Admin from './components/admin/admin';
import Managements from "./components/management/managements";
import Staffs from './components/staff/staffs';
import OrderDetails from './pages/Order/ordersDetails';
import DetailsUser from './components/admin/components/detailsUsersByAdmin';

import "bootstrap/dist/css/bootstrap.min.css";



export const ShowHeader = () => {
  const location = useLocation();
  if (location.pathname !== "/" && location.pathname !== "/signUp") return <Header />;
  else return <></>;
};


export const ShowFooter = () => {
  const location = useLocation();
  if (location.pathname !== "/" && location.pathname !== "/signUp") return <Footer />;
  else return <></>;
};

export default function App() {
  return (
    <Router>
      <ShowHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/managements" element={<Managements />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/signUp" element={<SignUp/>} />

        <Route path="/detailsID/:userID" element={<DetailsUser />} />
        <Route path="/ordersID/:productId" element={<OrderDetails />} />


        
      </Routes>
      <ShowFooter />
    </Router>
  );
}
