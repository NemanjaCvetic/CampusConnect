import { useState } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Elena Nenadović",
      email: "elena@email.com",
      role: "admin",
      registeredDate: "2026-04-18",
    },
    {
      id: 2,
      name: "Nemanja Cvetić",
      email: "nemanja@email.com",
      role: "user",
      registeredDate: "2026-04-20",
    },
  ]);

  function toggleRole(id) {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              role: user.role === "admin" ? "user" : "admin",
            }
          : user
      )
    );
  }

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
                <span className={`role ${user.role}`}>
                  {user.role}
                </span>
              </td>

              <td>{user.registeredDate}</td>

              <td>
                <button className= "users-button" onClick={() => toggleRole(user.id)}>
                  Make {user.role === "admin" ? "User" : "Admin"}
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