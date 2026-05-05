import { useState } from "react";
import "./Items.css";

function Items() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Black Wallet",
      type: "Lost",
      category: "Accessories",
      reporter: "Elena Nenadović",
      status: "Open",
      date: "2026-04-18",
    },
    {
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },
    {
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },{
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },{
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },{
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },{
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },{
      id: 2,
      title: "White AirPods Case",
      type: "Found",
      category: "Electronics",
      reporter: "Nemanja Cvetić",
      status: "Open",
      date: "2026-04-20",
    },
  ]);

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
            <th onClick={() => handleSort("reporter")}>Reporter</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.reporter}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
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