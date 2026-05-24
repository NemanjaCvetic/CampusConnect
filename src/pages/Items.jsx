import { useState, useEffect } from "react";
import "./Items.css";
import { fetchItems, deleteItem } from "../api/items";

function Items() {
  
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    await deleteItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  const sortedItems = [...items].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="admin-items-page">
      <h1>Item Reports</h1>

      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("type")}>Type</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("reporter_name")}>Reporter</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th onClick={() => handleSort("created_at")}>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.reporter_name}</td>
              <td>{item.status}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Items;