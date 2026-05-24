import { useState, useEffect } from "react";
import "./Profile.css";
import { fetchItems } from "../api/items";
import { getMyConversations, getMessages, sendMessage, resolveConversation } from "../api/messages";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    fetchItems({ userId: user?.id, status: "all" })
      .then(data => setMyItems(data))
      .catch(() => setMyItems([]))
      .finally(() => setLoading(false));

    getMyConversations()
      .then(data => setConversations(data))
      .catch(() => setConversations([]));
  }, []);

  function openConversation(conv) {
    setActiveConv(conv);
    getMessages(conv.id).then(data => setMessages(data));
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const msg = await sendMessage(activeConv.id, newMessage);
      setMessages(prev => [...prev, msg]);
      setNewMessage("");
      // Update last message preview in conversation list
      setConversations(prev =>
        prev.map(c => c.id === activeConv.id
          ? { ...c, last_message: msg.body, last_message_at: msg.sent_at }
          : c
        )
      );
    } finally {
      setSending(false);
    }
  }

  async function handleResolve(action) {
    if (!activeConv) return;
    setResolving(true);
    try {
      const msg = await resolveConversation(activeConv.id, action);
      setMessages(prev => [...prev, msg]);
    } catch (err) {
      alert(err.message);
    } finally {
      setResolving(false);
    }
  }

  const resolvedItems = myItems.filter(i => i.status === "resolved");
  const openItems = myItems.filter(i => i.status === "open");

  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <h1>My Profile</h1>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Student ID:</strong> {user?.student_number}</p>
      </div>

      <div className="profile-section">
        <h2>Your Active Reports</h2>
        {loading ? <p>Loading...</p> : (
          <div className="profile-grid">
            {openItems.length === 0 && <p>No active reports.</p>}
            {openItems.map(item => (
              <div key={item.id} className="profile-card">
                <h3>{item.title}</h3>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Date:</strong> {item.created_at?.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Resolved Items</h2>
        {loading ? <p>Loading...</p> : (
          <div className="profile-grid">
            {resolvedItems.length === 0 && <p>No resolved items yet.</p>}
            {resolvedItems.map(item => (
              <div key={item.id} className="profile-card">
                <h3>{item.title}</h3>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Inbox</h2>
        {conversations.length === 0 ? (
          <p className="profile-muted">No conversations yet.</p>
        ) : (
          <div className="inbox-layout">

            {/* Conversation list */}
            <div className="inbox-list">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  className={`inbox-card ${activeConv?.id === conv.id ? "active" : ""}`}
                  onClick={() => openConversation(conv)}
                >
                  <h3>{conv.item_title}</h3>
                  <p className="inbox-participants">
                    {conv.user1_name} &amp; {conv.user2_name}
                  </p>
                  <p className="inbox-preview">{conv.last_message || "No messages yet"}</p>
                  {conv.unread_count > 0 && (
                    <span className="unread-badge">{conv.unread_count}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Message thread */}
            {activeConv && (
              <div className="message-thread">
                <div className="thread-header">
                  <h3>{activeConv.item_title}</h3>
                  <p>{activeConv.user1_name} &amp; {activeConv.user2_name}</p>
                </div>

                <div className="thread-messages">
                  {messages.length === 0 && <p className="profile-muted">No messages yet.</p>}
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`message-bubble ${msg.sender_id === user?.id ? "mine" : "theirs"}`}
                    >
                      <span className="message-sender">{msg.sender_name}</span>
                      <p>{msg.body}</p>
                      <span className="message-time">{msg.sent_at?.slice(0, 16).replace("T", " ")}</span>
                    </div>
                  ))}
                </div>

                {/* Show approve/reject only if the logged-in user is the item owner */}
                {activeConv?.poster_id === user?.id && (
                  <div className="resolve-actions">
                    <button
                      className="btn-approve"
                      onClick={() => handleResolve("approved")}
                      disabled={resolving}
                    >
                      ✅ Approve Claim
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleResolve("rejected")}
                      disabled={resolving}
                    >
                      ❌ Reject Claim
                    </button>
                  </div>
                )}

                <form className="message-form" onSubmit={handleSend}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={sending}
                  />
                  <button type="submit" disabled={sending || !newMessage.trim()}>
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;