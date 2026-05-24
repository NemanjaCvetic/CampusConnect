const BASE = "http://localhost:3000/api";

export async function fetchClaims() {
    const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/claims`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch claims");
  return res.json();
}
