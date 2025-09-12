
import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  async function fetchUsers() {
    console.log("fetchUsers called ✅");
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("API Response ✅", data);
      // 👇 adjust depending on backend response
      setUsers(data.users || data.user || []);
    } catch (error) {
      console.log("API Error ❌", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update this user role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>update role</th>
            </tr>
          </thead>
         <tbody>
  {users.length === 0 ? (
    <tr>
      <td colSpan="5">No users found</td>
    </tr>
  ) : (
    users.map((e, i) => (
      <tr key={e._id || i}>
        <td data-label="#"> {i + 1} </td>
        <td data-label="Name"> {e.name} </td>
        <td data-label="Email"> {e.email} </td>
        <td data-label="Role"> {e.role} </td>
        <td data-label="Action">
          <button
            onClick={() => updateRole(e._id)}
            className="common-btn"
          >
            Update Role
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;