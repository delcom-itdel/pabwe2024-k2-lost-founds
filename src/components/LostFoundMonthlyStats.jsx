// src/components/LostFoundMonthlyStats.jsx

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Prepare data for the pie charts
  const totalLosts = Object.values(stats.stats_losts || {}).reduce(
    (a, b) => a + b,
    0
  );
  const totalFounds = Object.values(stats.stats_founds || {}).reduce(
    (a, b) => a + b,
    0
  );

  const totalLostsCompleted = Object.values(
    stats.stats_losts_completed || {}
  ).reduce((a, b) => a + b, 0);
  const totalFoundsCompleted = Object.values(
    stats.stats_founds_completed || {}
  ).reduce((a, b) => a + b, 0);

  const totalLostsProcess = Object.values(
    stats.stats_losts_process || {}
  ).reduce((a, b) => a + b, 0);
  const totalFoundsProcess = Object.values(
    stats.stats_founds_process || {}
  ).reduce((a, b) => a + b, 0);

  const pieData1 = {
    labels: ["Losts", "Founds"],
    datasets: [
      {
        data: [totalLosts, totalFounds],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const pieData2 = {
    labels: ["Losts Completed", "Founds Completed"],
    datasets: [
      {
        data: [totalLostsCompleted, totalFoundsCompleted],
        backgroundColor: ["#FF9F40", "#4BC0C0"],
      },
    ],
  };

  const pieData3 = {
    labels: ["Losts In Process", "Founds In Process"],
    datasets: [
      {
        data: [totalLostsProcess, totalFoundsProcess],
        backgroundColor: ["#9966FF", "#FFCD56"],
      },
    ],
  };

  // Options for the pie charts
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <h2>Monthly Lost & Found Stats (Last 12 months)</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "32%", height: "300px" }}>
              <Pie data={pieData1} options={pieOptions} />
            </div>
            <div style={{ width: "32%", height: "300px" }}>
              <Pie data={pieData2} options={pieOptions} />
            </div>
            <div style={{ width: "32%", height: "300px" }}>
              <Pie data={pieData3} options={pieOptions} />
            </div>
          </div>
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
        </>
      )}
    </div>
  );
}

export default LostFoundMonthlyStats;
