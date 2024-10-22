//Monthly Stats
import React, { useState, useEffect } from "react";
import api from "../utils/api";

function LostFoundMonthlyStats() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      setLoading(true);
      setError("");
      try {
        const endDate = new Date();
        const formattedEndDate = `${endDate.getFullYear()}-${String(
          endDate.getMonth() + 1
        ).padStart(2, "0")}-${String(endDate.getDate()).padStart(
          2,
          "0"
        )} 22:00:00`;

        const result = await api.getStatsMonthly({
          endDate: formattedEndDate,
          totalData: 12,
        });
        setStats(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch monthly stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyStats();
  }, []);

  return (
    <div>
      <h2>Monthly Lost & Found Stats (Last 12 months)</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Losts</th>
              <th>Losts Completed</th>
              <th>Losts In Process</th>
              <th>Founds</th>
              <th>Founds Completed</th>
              <th>Founds In Process</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stats.stats_losts || {}).map((month) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{stats.stats_losts[month]}</td>
                <td>{stats.stats_losts_completed[month]}</td>
                <td>{stats.stats_losts_process[month]}</td>
                <td>{stats.stats_founds[month]}</td>
                <td>{stats.stats_founds_completed[month]}</td>
                <td>{stats.stats_founds_process[month]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LostFoundMonthlyStats;
