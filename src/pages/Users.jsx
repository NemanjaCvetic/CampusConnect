import { useState, useEffect } from "react";
import "./Users.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function toggleRole(id, currentRole) {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/admin/users/${id}/role`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(({ role }) => {
        setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
      })
      .catch((err) => setError(err.message));
  }

  if (loading) return <div className="users-page"><p>Loading users...</p></div>;
  if (error) return <div className="users-page"><p>Error: {error}</p></div>;

  return (
    <div className="users-page">
      <h1>Users</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role ${user.role}`}>{user.role}</span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="users-button"
                  onClick={() => toggleRole(user.id, user.role)}
                >
                  Make {user.role === "admin" ? "Student" : "Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;