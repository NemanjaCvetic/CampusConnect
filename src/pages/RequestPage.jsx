import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./RequestPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function RequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [secretAnswer, setSecretAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch the real item from the backend
  useEffect(() => {
    fetch(`${API_URL}/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item not found");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleSubmit(e) {
  e.preventDefault();
  if (!secretAnswer.trim()) {
    setError("Please describe the item to verify your claim.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  if (!item) {
    setError("Item data not loaded yet.");
    return;
  }

  setSubmitting(true);
  setError(null);

  // Step 1: Submit the claim
  fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: Number(id), secret_answer: secretAnswer }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit claim");
      return data;
    })

    // Step 2: Create (or find existing) conversation with the item owner
    .then(() => {
      return fetch(`${API_URL}/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: Number(id), recipientId: item.user_id }),
      });
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        console.warn("Conversation creation failed:", data.message);
        return null;
      }
      return data;
    })

    // Step 3: Send the claim description as the first message
    .then((conversation) => {
      if (!conversation?.id) return null;
      return fetch(`${API_URL}/conversations/${conversation.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: secretAnswer }),
      });
    })
    .then(() => setSuccess(true))
    .catch((err) => setError(err.message))
    .finally(() => setSubmitting(false));
}

  if (loading) return <div className="request-page"><div className="request-card"><p>Loading...</p></div></div>;

  if (success) return (
    <div className="request-page">
      <div className="request-card">
        <h1>Claim Submitted</h1>
        <p>Your claim for <strong>{item?.title}</strong> has been submitted. The admin will review it shortly.</p>
        <button className="submit-btn" onClick={() => navigate("/lostfound")}>Back to Listings</button>
      </div>
    </div>
  );

  return (
    <div className="request-page">
      <div className="request-card">
        <h1>Request Item</h1>

        {item && (
          <p className="request-item">
            Item: <strong>{item.title}</strong>
          </p>
        )}

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="request-form">
          <textarea
            placeholder="Describe the item in detail to prove it belongs to you (e.g. what's inside the wallet, what the keychain looks like)..."
            value={secretAnswer}
            onChange={(e) => setSecretAnswer(e.target.value)}
            required
            rows="6"
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Claim"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestPage;