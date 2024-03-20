import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../../api/axiosClient";
import "./detailsUsersByAdmin.css";

export default function DetailsUsers({ userID }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userID);
  }, [userID]);

  const fetchUser = async (userID) => {
    try {
      const response = await AxiosClient.get(`/api/Users/${userID}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <table className="table product-info-table-modal">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{user.Address}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{user.Description}</td>
          </tr>
          <tr>
            <td>Code</td>
            <td>{user.Code}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{user.Status}</td>
          </tr>
          <tr>
            <td>RoleID</td>
            <td>{user.RoleID}</td>
          </tr>
          <tr>
            <td>Create Date</td>
            <td>{user.CreationDate}</td>
          </tr>
          <tr>
            <td>Update Date</td>
            <td>{user.ModificationDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
