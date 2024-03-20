import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient"; 
import "./admin.css";

export default function Admin() {
  const [users, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
   
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AxiosClient.get("/api/Users");
      const ordersWithId = response.data.map((orders, index) => ({
        ...orders,
        id: index + 1, 
      }));
      setUser(ordersWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

// Add Users



// Delete Users -> delete from database
const deleteUsers = async (Id) => {
  try {
    await AxiosClient.delete(`/api/Users/${Id}`); 
    const updatedUsers = users.filter(
      (user) => user.Id !== Id 
    );
    setUser(updatedUsers);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  // Details user
  const handleDetailsClick = (userID) => {
    navigate(`/detailsID/${userID}`);
  };

  const columns = [
    {
      field: "Id",
      headerName: "No",
      width: 70,
    },
    { field: "FullName", headerName: "Full Name", width: 140 },
    { field: "Email", headerName: "Email", width: 330 },
    { field: "Password", headerName: "Password", width: 160 },
    { field: "PhoneNumber", headerName: "Phone", width: 140 },
    {
      field: "detail",
      headerName: "Detail",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          handleDetailsClick(params.row.id);
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            <BiSolidDetail className="icon-table" />
          </Button>
        );
      },
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
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onDelete = () => {
          deleteUsers(params.row.Id);
        };

        return (
          <Button variant="contained" color="error" onClick={onDelete}>
            <MdDeleteOutline className="icon-table" />
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
    <div className="admin-container">
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
