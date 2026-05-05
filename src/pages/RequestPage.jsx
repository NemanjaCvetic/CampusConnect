import { useParams } from "react-router-dom";
import { useState } from "react";
import "./RequestPage.css";

const items = [
  {
    id: 1,
    title: "Black Wallet",
  },
  {
    id: 2,
    title: "Silver Keys",
  },
  {
    id: 3,
    title: "White AirPods Case",
  },
];

function RequestPage() {
  const { id } = useParams();

  const selectedItem = items.find((item) => item.id === Number(id));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();


    if (!fullName || !email || !message) {
    alert("Please fill all fields");
    return;
  }
  
    console.log({
      item: selectedItem?.title,
      fullName,
      email,
      message,
    });
  }

  return (
    <div className="request-page">
      <div className="request-card">
        <h1>Request Item</h1>

        <p className="request-item">
          Item: <strong>{selectedItem?.title}</strong>
        </p>

        <form onSubmit={handleSubmit} className="request-form">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
          ></textarea>

          <button type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
}

export default RequestPage;