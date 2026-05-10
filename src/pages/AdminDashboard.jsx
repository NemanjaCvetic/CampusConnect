import "./Admin.css";
import { Link,Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(r => r.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <div className="admin-intro">
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin</p>
      </div>

      <div className="admin-content">
        <div className="admin-content-1">
          <h1 className="admin-card-title">Items</h1>
          <div className="admin-card-1">
            <p className="description">Total items: <strong>{stats.totalItems}</strong></p>
            <p className="description">Resolved: <strong>{stats.resolvedItems}</strong></p>
            <Link to="/items">
              <button className="users-button">See all items</button>
            </Link>
          </div>
        </div>

        <div className="admin-content-1">
          <h1 className="admin-card-title">Users</h1>
          <div className="admin-card-1">
            <p className="description">Total users: <strong>{stats.totalUsers}</strong></p>
            <Link to="/users">
              <button className="users-button">See all users</button>
            </Link>
          </div>
        </div>

        <div className="admin-content-1">
          <h1 className="admin-card-title">Claims</h1>
          <div className="admin-card-1">
            <p className="description">Pending claims: <strong>{stats.pendingClaims}</strong></p>
            <Link to="/admin/claims">
              <button className="users-button">See all claims</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;