const BASE = "http://localhost:3000/api";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function getOrCreateConversation(itemId, recipientId) {
  const res = await fetch(`${BASE}/conversations`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ itemId, recipientId }),
  });
  if (!res.ok) throw new Error("Failed to start conversation");
  return res.json();
}

export async function getMyConversations() {
  const res = await fetch(`${BASE}/conversations`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

export async function getMessages(conversationId) {
  const res = await fetch(`${BASE}/conversations/${conversationId}/messages`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(conversationId, body) {
  const res = await fetch(`${BASE}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}