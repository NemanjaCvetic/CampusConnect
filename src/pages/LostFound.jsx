import "./LostFound.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

const items = [
  {
    id: 1,
    title: "Black Wallet",
    category: "Accessories",
    location: "Library",
    date: "2026-04-18",
    status: "Lost",
    description: "Black leather wallet with student card inside.",
  },
  {
    id: 2,
    title: "Silver Keys",
    category: "Keys",
    location: "Main Entrance",
    date: "2026-04-17",
    status: "Found",
    description: "A small set of keys with a blue keychain.",
  },
  {
    id: 3,
    title: "White AirPods Case",
    category: "Electronics",
    location: "Cafeteria",
    date: "2026-04-16",
    status: "Found",
    description: "White AirPods case without earbuds.",
  },
  {
    id: 4,
    title: "Student Documents",
    category: "Documents",
    location: "Reception",
    date: "2026-04-15",
    status: "Found",
    description: "Student documents found near the reception desk.",
  },
  {
    id: 5,
    title: "Water Bottle",
    category: "Food&Drinks",
    location: "Cafeteria",
    date: "2026-04-14",
    status: "Lost",
    description: "Reusable bottle left in the cafeteria.",
  },
  {
    id: 6,
    title: "Math Book",
    category: "Books",
    location: "Classroom 2",
    date: "2026-04-13",
    status: "Lost",
    description: "Math textbook with notes inside.",
  },
  {
    id: 7,
    title: "Ring",
    category: "Valuables",
    location: "Hallway",
    date: "2026-04-12",
    status: "Found",
    description: "Small silver ring found in the hallway.",
  },
  {
    id: 8,
    title: "Umbrella",
    category: "Other",
    location: "Main Entrance",
    date: "2026-04-11",
    status: "Found",
    description: "Black umbrella left near the entrance.",
  },
];

function LostFound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromHome = searchParams.get("category");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState(categoryFromHome || "all");

  const categories = [
    "Accessories",
    "Keys",
    "Electronics",
    "Documents",
    "Food&Drinks",
    "Books",
    "Valuables",
    "Other",
  ];

  const filteredItems = items.filter((item) => {
    const matchStatus =
      statusFilter === "all" || item.status.toLowerCase() === statusFilter;

    const matchCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchStatus && matchCategory;
  });

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

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <p>No items found in this category.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => navigate(`/request/${item.id}`)}
            >
              <div className="item-top">
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <span className="item-category">{item.category}</span>
              </div>

              <h2>{item.title}</h2>
              <p className="item-description">{item.description}</p>

              <div className="item-info">
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostFound;