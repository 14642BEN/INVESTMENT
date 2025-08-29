// src/App.jsx
import { useEffect, useState } from "react";

function App() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/investments`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }

        const data = await response.json();
        setInvestments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>💰 Investment Packages</h1>

      {loading && <p>Loading investments...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {investments.length > 0 ? (
          investments.map((pkg) => (
            <div
              key={pkg.id || pkg._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                width: "250px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{pkg.name || "Unnamed Package"}</h3>
              <p>
                <strong>Price:</strong> ${pkg.price}
              </p>
              <p>{pkg.description || "No description available"}</p>
            </div>
          ))
        ) : (
          !loading && <p>No investments available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
