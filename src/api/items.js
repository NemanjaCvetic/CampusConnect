const BASE = "http://localhost:3000/api";

export async function fetchItems(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type)     params.append("type", filters.type);
  if (filters.category) params.append("category", filters.category);
  const res = await fetch(`${BASE}/items?${params}`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function fetchItemById(id) {
  const res = await fetch(`${BASE}/items/${id}`);
  if (!res.ok) throw new Error("Item not found");
  return res.json();
}

export async function createItem(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create item");
  }
  return res.json();
}

export async function deleteItem(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}

export async function resolveItem(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/items/${id}/resolve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to resolve item");
  return res.json();
}