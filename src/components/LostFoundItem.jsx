// LostFoundItem.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";

function LostFoundItem({ lostfound, onDeleteLostFound }) {
  const currentUser = useSelector((state) => state.currentUser);
  const isCurrentUserItem =
    currentUser && lostfound.user_id && lostfound.user_id === currentUser.id;

  let badgeStatus, badgeLabel;
  if (lostfound.is_completed) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }

  let statusClass = "badge ms-3";
  if (lostfound.status === "lost") {
    statusClass += " bg-danger text-white";
  } else if (lostfound.status === "found") {
    statusClass += " bg-info text-white";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8 d-flex item-home">
            <h5>
              <Link to={`/lostfound/${lostfound.id}`}>
                {lostfound.title}
              </Link>
            </h5>

            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>

          <div className="col-4 text-end">
            <span className={statusClass}>
              {lostfound.status === "lost" ? "Lost" : "Found"}
            </span>

            {isCurrentUserItem && (
              <button
                type="button"
                onClick={() => {
                  Swal.fire({
                    title: "Hapus LostFound",
                    text: `Apakah kamu yakin ingin menghapus lostfound: ${lostfound.title}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Tetap Hapus",
                    customClass: {
                      confirmButton: "btn btn-danger me-3 mb-4",
                      cancelButton: "btn btn-secondary mb-4",
                    },
                    buttonsStyling: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      onDeleteLostFound(lostfound.id);
                    }
                  });
                }}
                className="btn btn-sm btn-outline-danger ms-3"
              >
                <FaTrash /> Hapus
              </button>
            )}
          </div>

          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(lostfound.created_at)}</span>
              <span className="ms-3 text-muted">
                {lostfound.author
                  ? `by ${lostfound.author.name}`
                  : "Author unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const lostFoundItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  is_completed: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired, // Ensure this is included
  cover: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
  }),
};

LostFoundItem.propTypes = {
  lostfound: PropTypes.shape(lostFoundItemShape).isRequired,
  onDeleteLostFound: PropTypes.func.isRequired,
};

export { lostFoundItemShape };

export default LostFoundItem;
