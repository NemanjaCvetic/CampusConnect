import "./Admin.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
function AdminDashboard() {

  const item = [
    {
      id: 1,
      title: "Black Wallet",
      category: "Accessories",
      location: "Library",
      date: "2026-04-18",
      status: "Lost",
      description: "Black leather wallet with student card inside.",
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-intro">
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin</p>
      </div>

      <div className="admin-content">
        <div className="admin-content-1">
          <h1 className="admin-card-title">The Most Recent Issue</h1>

          <div className="admin-card-1">
            <div className="admin-details">
              <p className={`status-badge ${item[0].status.toLowerCase()}`}>
                {item[0].status}
              </p>
              <p className="admin-category">{item[0].category}</p>
            </div>

            <h1 className="admin-title">{item[0].title}</h1>
            <p className="description">{item[0].description}</p>

            <div className="admin-period">
              <p className="location">Location: {item[0].location}</p>
              <p className="date">Date: {item[0].date}</p>
            </div>

            <Link to = "/items">
            <button className="users-button">See all items</button>
        </Link>
          </div>
        </div>

        <div className="admin-content-1">
          <h1 className="admin-card-title">Users</h1>

          <div className="admin-card-1">
            <div className="admin-details">
              <p className="admin-category">Admins</p>
              <p className="admin-category">Students</p>
              
            </div>

            <br />

            <p className="description">
              There are currently {item.length + 1} users.
            </p>
            <Link to = "/users">
            <button className="users-button">See all users</button>
            </Link>
          </div>
        </div>

    

      </div>
    </div>
  );
}

export default AdminDashboard;