import { useState, useEffect } from "react";
import "./Profile.css";
import { fetchItems } from "../api/items";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems({ userId: user?.id, status: "all" })
      .then(data => setMyItems(data))
      .catch(() => setMyItems([]))
      .finally(() => setLoading(false));
  }, []);

  const resolvedItems = myItems.filter(i => i.status === "resolved");
  const openItems = myItems.filter(i => i.status === "open");

  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <h1>My Profile</h1>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Student ID:</strong> {user?.student_number}</p>
      </div>

      <div className="profile-section">
        <h2>Your Active Reports</h2>
        {loading ? <p>Loading...</p> : (
          <div className="profile-grid">
            {openItems.length === 0 && <p>No active reports.</p>}
            {openItems.map(item => (
              <div key={item.id} className="profile-card">
                <h3>{item.title}</h3>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Date:</strong> {item.created_at?.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Resolved Items</h2>
        {loading ? <p>Loading...</p> : (
          <div className="profile-grid">
            {resolvedItems.length === 0 && <p>No resolved items yet.</p>}
            {resolvedItems.map(item => (
              <div key={item.id} className="profile-card">
                <h3>{item.title}</h3>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Inbox</h2>
        <p className="profile-muted">Messaging coming soon.</p>
      </div>
    </div>
  );
}

export default Profile;