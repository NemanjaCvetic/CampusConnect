import "./Profile.css";

const requests = [
  {
    id: 1,
    item: "Black Wallet",
    date: "2026-04-19",
    status: "Pending",
  },
  {
    id: 2,
    item: "Silver Keys",
    date: "2026-04-15",
    status: "Approved",
  },
];

const solvedIssues = [
  {
    id: 1,
    item: "Student ID Card",
    resolvedDate: "2026-04-10",
    note: "Returned to owner",
  },
  {
    id: 2,
    item: "Blue Notebook",
    resolvedDate: "2026-04-05",
    note: "Claim verified successfully",
  },
];

const inboxMessages = [
  {
    id: 1,
    title: "Request Approved",
    message: "Your request for Silver Keys was approved.",
    date: "2026-04-16",
  },
  {
    id: 2,
    title: "Possible Match Found",
    message: "A possible match was found for your lost wallet report.",
    date: "2026-04-14",
  },
];

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <h1>My Profile</h1>
        <p><strong>Name:</strong> Elena Nenadović</p>
        <p><strong>Student ID:</strong> 12345678</p>
      </div>

      <div className="profile-section">
        <h2>Your Requests</h2>
        <div className="profile-grid">
          {requests.map((request) => (
            <div key={request.id} className="profile-card">
              <h3>{request.item}</h3>
              <p><strong>Date:</strong> {request.date}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2>History of Solved Issues</h2>
        <div className="profile-grid">
          {solvedIssues.map((issue) => (
            <div key={issue.id} className="profile-card">
              <h3>{issue.item}</h3>
              <p><strong>Resolved:</strong> {issue.resolvedDate}</p>
              <p>{issue.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2>Inbox</h2>
        <div className="inbox-list">
          {inboxMessages.map((msg) => (
            <div key={msg.id} className="inbox-card">
              <h3>{msg.title}</h3>
              <p>{msg.message}</p>
              <span>{msg.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;