// Accounts.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient";
import "./../../components/common/styles/accountUser.css";
import { IoIosCheckbox } from "react-icons/io";
import EditAccountModal from "../Modal/EditAccountModal";

export default function Accounts() {
  const [users, setUsers] = useState([]); // Đổi setUser thành setUsers để phản ánh đúng mục đích
  const [totalUsers, setTotalUsers] = useState(0);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Đổi selectedProduct thành selectedUser để phản ánh đúng mục đích

  const handleEditClick = (user) => {
    setSelectedUser(user); // Đổi selectedProduct thành selectedUser để phản ánh đúng mục đích
    setEditModalShow(true);
  };

  const handleModalClose = () => {
    setEditModalShow(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await AxiosClient.get("/api/Users");
      const usersWithId = response.data.map((user, index) => ({ // Đổi orders thành user để phản ánh đúng mục đích
        ...user,
        id: index + 1,
      }));
      setUsers(usersWithId); // Đổi setUser thành setUsers để phản ánh đúng mục đích
    } catch (error) {
      console.error("Error fetching users:", error); // Đổi "Error fetching products" thành "Error fetching users" để phản ánh đúng thông báo
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
    { field: "Address", headerName: "Address", width: 140 },
    {
      field: "Status",
      headerName: "Status",
      width: 50,
      renderCell: (params) => {
        if (params.row.Status === 1) {
          return <IoIosCheckbox className="icon-table" />;
        } else if (params.row.Status === 2) {
          return null;
        }
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
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
      {editModalShow && (
        <EditAccountModal
          show={editModalShow}
          onHide={handleModalClose}
          account={selectedUser} // Đổi product thành account để phản ánh đúng mục đích
          iscreate="true"
        />
      )}
    </div>
  );
}
