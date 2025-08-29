const apiUrl = import.meta.env.VITE_API_URL;

export async function getInvestments() {
  try {
    const res = await fetch(`${apiUrl}/api/investments`);
    if (!res.ok) throw new Error("Failed to fetch investments");
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
}
