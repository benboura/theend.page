const API_BASE_URL = "http://localhost:3001/api";

export async function fetchGallery() {
  const res = await fetch(`${API_BASE_URL}/gallery`);
  if (!res.ok) throw new Error("Erreur lors du chargement de la galerie");
  return res.json();
}

export async function createPage(data) {
  const res = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function fetchContact() {
  const res = await fetch(`${API_BASE_URL}/contact`);
  if (!res.ok) throw new Error("Erreur lors du chargement des contacts");
  return res.json();
}
