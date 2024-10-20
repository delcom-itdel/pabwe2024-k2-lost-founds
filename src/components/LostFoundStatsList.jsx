import PropTypes from "prop-types";
import LostFoundStatsItem from "./LostFoundStatsItem";

function LostFoundStatsList({ statsList, statsType }) {
  return (
    <div>
      {statsList.map((stats, index) => (
        <LostFoundStatsItem key={index} stats={stats} statsType={statsType} />
      ))}
    </div>
  );
}

LostFoundStatsList.propTypes = {
  statsList: PropTypes.arrayOf(
    PropTypes.shape({
      stats_lost: PropTypes.number.isRequired,
      stats_losts_completed: PropTypes.number.isRequired,
      stats_losts_process: PropTypes.number.isRequired,
      stats_founds: PropTypes.number.isRequired,
      stats_founds_completed: PropTypes.number.isRequired,
      stats_founds_process: PropTypes.number.isRequired,
    })
  ).isRequired,
  statsType: PropTypes.string.isRequired,
};

export default LostFoundStatsList;
