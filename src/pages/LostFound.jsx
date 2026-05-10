import "./LostFound.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchItems } from "../api/items";



function LostFound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromHome = searchParams.get("category");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState(categoryFromHome || "all");

const [items, setItems]     = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError]     = useState(null);

useEffect(() => {
  setLoading(true);
  const params = new URLSearchParams();
  if (statusFilter !== "all")   params.append("type", statusFilter);
  if (categoryFilter !== "all") params.append("category", categoryFilter);

  fetch(`http://localhost:3000/api/items?${params}`)
    .then(res => res.json())
    .then(data => { setItems(data); setLoading(false); })
    .catch(() => { setError("Failed to load items."); setLoading(false); });
}, [statusFilter, categoryFilter]);

  const categories = [
  "Electronics",
  "Documents",
  "Food & Drinks",
  "Books",
  "Valuables",
  "Other",
];


  return (
    <div className="lostfound-page">
      <div className="lostfound-header">
        <h1>Lost & Found</h1>
        <p>Browse items.</p>
      </div>

      <div className="lostfound-actions">
        <Link to="/report-lost">
          <button className="lost-btn">Report Lost Item</button>
        </Link>

        <Link to="/report-found">
        <button className="found-btn">Report Found Item</button>
        </Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <button
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>

          <button
            className={`filter-btn ${statusFilter === "lost" ? "active" : ""}`}
            onClick={() => setStatusFilter("lost")}
          >
            Lost
          </button>

          <button
            className={`filter-btn ${statusFilter === "found" ? "active" : ""}`}
            onClick={() => setStatusFilter("found")}
          >
            Found
          </button>
        </div>

        <div className="filter-group">
          <button
            className={`filter-btn ${categoryFilter === "all" ? "active" : ""}`}
            onClick={() => setCategoryFilter("all")}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                categoryFilter === category ? "active" : ""
              }`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="loading-msg">Loading items...</p>}
      {error   && <p className="error-msg">{error}</p>}

      <div className="items-grid">
        {items.length === 0 ? (
          <p>No items found in this category.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => navigate(`/request/${item.id}`)}
            >
              <div className="item-top">
                <span className={`status-badge ${item.type}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <span className="item-category">{item.category}</span>
              </div>

              <h2>{item.title}</h2>
              <p className="item-description">{item.description}</p>

              <div className="item-info">
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p><strong>Date:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostFound;