// src/pages/LostFoundStatsPage.jsx

import React, { useState } from "react";
import LostFoundDailyStats from "../components/LostFoundDailyStats";
import LostFoundMonthlyStats from "../components/LostFoundMonthlyStats";

function LostFoundStatsPage() {
  const [view, setView] = useState("daily");

  return (
    <section>
      <div className="container pt-1">
        <h1>Lost and Found Stats</h1>
        <div style={{ marginBottom: "20px", marginTop: "10px" }}>
          <label htmlFor="view-select">Choose Stats Type: </label>
          <select
            id="view-select"
            value={view}
            onChange={(e) => setView(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {/* Conditionally render the appropriate component */}
        {view === "daily" ? <LostFoundDailyStats /> : <LostFoundMonthlyStats />}
      </div>
    </section>
  );
}

export default LostFoundStatsPage;
