//Daily Stats
import React, { useState, useEffect } from "react";
import api from "../utils/api";

function LostFoundDailyStats() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyStats = async () => {
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

        const result = await api.getStatsDaily({
          endDate: formattedEndDate,
          totalData: 30,
        });
        setStats(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch monthly stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyStats();
  }, []);

  return (
    <div>
      <h2>Daily Lost & Found Stats (Last 30 days)</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Losts</th>
              <th>Losts Completed</th>
              <th>Losts In Process</th>
              <th>Founds</th>
              <th>Founds Completed</th>
              <th>Founds In Process</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stats.stats_losts || {}).map((date) => (
              <tr key={date}>
                <td>{date}</td>
                <td>{stats.stats_losts[date]}</td>
                <td>{stats.stats_losts_completed[date]}</td>
                <td>{stats.stats_losts_process[date]}</td>
                <td>{stats.stats_founds[date]}</td>
                <td>{stats.stats_founds_completed[date]}</td>
                <td>{stats.stats_founds_process[date]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LostFoundDailyStats;
