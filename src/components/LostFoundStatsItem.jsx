import PropTypes from "prop-types";

function LostFoundStats({ stats, statsType }) {
  const {
    stats_losts,
    stats_losts_completed,
    stats_losts_process,
    stats_founds,
    stats_founds_completed,
    stats_founds_process,
  } = stats;

  return (
    <div>
      <h2>{statsType === "daily" ? "Daily Stats" : "Monthly Stats"}</h2>
      <ul>
        <li>Lost Items: {JSON.stringify(stats_losts)}</li>
        <li>Completed Lost Items: {JSON.stringify(stats_losts_completed)}</li>
        <li>Lost Items in Process: {JSON.stringify(stats_losts_process)}</li>
        <li>Found Items: {JSON.stringify(stats_founds)}</li>
        <li>Completed Found Items: {JSON.stringify(stats_founds_completed)}</li>
        <li>Found Items in Process: {JSON.stringify(stats_founds_process)}</li>
      </ul>
    </div>
  );
}

LostFoundStats.propTypes = {
  stats: PropTypes.shape({
    stats_losts: PropTypes.object.isRequired,
    stats_losts_completed: PropTypes.object.isRequired,
    stats_losts_process: PropTypes.object.isRequired,
    stats_founds: PropTypes.object.isRequired,
    stats_founds_completed: PropTypes.object.isRequired,
    stats_founds_process: PropTypes.object.isRequired,
  }).isRequired,
  statsType: PropTypes.string.isRequired,
};

export default LostFoundStats;
