import { useState } from "react";
import "./Claims.css";

function Claims() {
  const [claims, setClaims] = useState([
    {
      id: 1,
      itemTitle: "Black Wallet",
      claimantName: "Ana Novak",
      submittedAnswer: "It has my student card inside.",
      correctAnswer: "Student card and bank card inside.",
      status: "pending",
    },
    {
      id: 2,
      itemTitle: "White AirPods Case",
      claimantName: "Marko Horvat",
      submittedAnswer: "There is a small scratch on the front.",
      correctAnswer: "Small scratch on the front and initials E.N.",
      status: "disputed",
    },
  ]);

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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visibleClaims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.itemTitle}</td>
              <td>{claim.claimantName}</td>
              <td>{claim.submittedAnswer}</td>
              <td>{claim.correctAnswer}</td>
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