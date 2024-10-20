import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncGetStatsDaily,
  asyncGetStatsMonthly,
} from "../states/lostfound/action";
import LostFoundStats from "../components/LostFoundStatsItem";

function LostFoundStatsPage() {
  const { type } = useParams(); // 'daily' or 'monthly'
  const dispatch = useDispatch();

  // Define the end_date and total_data for the API call
  const end_date = "2024-10-07 22:00:00"; // Example end_date
  const total_data = 7; // Example total_data value

  const { statsDaily, statsMonthly } = useSelector((state) => ({
    statsDaily: state.statsDaily,
    statsMonthly: state.statsMonthly,
  }));

  const stats = type === "daily" ? statsDaily : statsMonthly;

  // Fetch stats when the component mounts or when the type changes
  useEffect(() => {
    if (type === "daily") {
      dispatch(asyncGetStatsDaily(end_date, total_data));
    } else if (type === "monthly") {
      dispatch(asyncGetStatsMonthly(end_date, total_data));
    }
  }, [dispatch, type, end_date, total_data]);

  return (
    <section>
      <div className="container pt-1">
        {stats ? (
          <LostFoundStats stats={stats} statsType={type} />
        ) : (
          <p>Loading stats...</p>
        )}
      </div>
    </section>
  );
}

export default LostFoundStatsPage;
