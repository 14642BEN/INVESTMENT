// src/Home.jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        console.log("Fetching from:", import.meta.env.VITE_API_URL);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/investments`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setInvestments(data);
      } catch (err) {
        console.error("❌ Error fetching investments:", err);
        setError("Failed to fetch investments");
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Investment Packages</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {investments.length === 0 && !error && (
        <p>No investments available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <div
            key={inv._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{inv.name}</h2>
            <p className="text-gray-600">${inv.price}</p>
            <p className="text-sm mt-2">{in
