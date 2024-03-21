import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient"; 
import "./../../components/common/styles/accountUser.css";
import {  IoIosCheckbox } from "react-icons/io";

export default function Accounts() {
  const [users, setUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); 

  useEffect(() => {
   
    fetchUsers();
  }, []);
  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);
  const fetchUsers = async () => {
    try {
      const response = await AxiosClient.get("/api/Users");
      const usersWithId = response.data.map((orders, index) => ({
        ...orders,
        id: index + 1, 
      }));
      setUser(usersWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const columns = [
    {
      field: "Id",
      headerName: "No",
      width: 70,
    },
    { field: "FullName", headerName: "Full Name", width: 140 },
    { field: "Email", headerName: "Email", width: 300 },
    { field: "Password", headerName: "Password", width: 160 },
    { field: "PhoneNumber", headerName: "Phone", width: 140 },
    { field: "Code", headerName: "Code", width: 100 },
    { field: "Address", headerName: "Address", width: 140 },
    { field: "Status", 
    headerName: "Status", 
    width: 50, 
    renderCell: (params) => {
      if (params.row.Status === 1) {
        return ( <IoIosCheckbox className="icon-table" /> );
      } else if (params.row.Status === 2) {
        return null; 
      }
    }
  },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary">
            <FaRegEdit className="icon-table" />
          </Button>
        );
      },
    },
  ].map((column) => ({
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="row">
        <div className="mume markdown-preview">
            <Row className="justify-content-center">
              <Col>
                <DataGrid
                  className="table-manage-order-box"
                  rows={users}
                  columns={columns}
                  pageSize={10}
                  pagination
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
