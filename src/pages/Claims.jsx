import { useState, useEffect } from "react";
import "./Claims.css";
import { fetchClaims } from "../api/claims";
function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(
    () => {
      setLoading(true);
      const params = new URLSearchParams();
      fetchClaims()
        .then(data => {
          setClaims(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load claims");
          setLoading(false);
        });
    }, []
  );

  function handleDecision(id, decision) {
    setClaims(
      claims.map((claim) =>
        claim.id === id
          ? { ...claim, status: decision }
          : claim
      )
    );
  }

  const visibleClaims = claims.filter(
    (claim) => claim.status === "pending" || claim.status === "disputed"
  );

  return (
    <div className="admin-claims-page">
      <h1>Claim Review</h1>
      <p>Review pending and disputed ownership claims.</p>

      <table className="claims-table">
        <thead>
          <tr>
            <th>Item Title</th>
            <th>Claimant</th>
            <th>Submitted Answer</th>
            <th>Correct Answer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {visibleClaims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.item_title}</td>
              <td>{claim.claimant_name}</td>
              <td>{claim.claimant_answer}</td>
              <td>{claim.status}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleDecision(claim.id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleDecision(claim.id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleClaims.length === 0 && (
        <p className="empty-message">No pending or disputed claims.</p>
      )}
    </div>
  );
}

export default Claims;