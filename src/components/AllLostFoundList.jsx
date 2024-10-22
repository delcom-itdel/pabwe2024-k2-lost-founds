import PropTypes from "prop-types";
import LostFoundItem, { lostFoundItemShape } from "./AllLostFoundItem";

function LostFoundList({ lostfounds, onDeleteLostFound }) {
  return (
    <div>
      {lostfounds.map((lostfound) => (
        <LostFoundItem
          key={lostfound.id}
          lostfound={lostfound}
          onDeleteLostFound={onDeleteLostFound}
        />
      ))}
    </div>
  );
}

LostFoundList.propTypes = {
  lostfounds: PropTypes.arrayOf(PropTypes.shape(lostFoundItemShape)).isRequired,
  onDeleteLostFound: PropTypes.func.isRequired,
};

export default LostFoundList;
