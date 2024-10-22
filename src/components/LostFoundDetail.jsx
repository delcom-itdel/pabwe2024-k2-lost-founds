// LostFoundDetail.jsx
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { lostFoundItemShape } from "./LostFoundItem";
import { postedAt } from "../utils/tools";
import { FaClock, FaPenToSquare, FaUpload } from "react-icons/fa6";
import { MdOutlineImageNotSupported } from "react-icons/md";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { asyncDetailLostFound } from "../states/lostfound/action";
import { useParams } from "react-router-dom";

function LostFoundDetail({ lostfound, onEditLostFound }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const isCurrentUserItem = currentUser && lostfound.user_id === currentUser.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(lostfound?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    lostfound?.description || ""
  );
  const [editedStatus, setEditedStatus] = useState(lostfound?.status || "lost");
  const [editedCompleted, setEditedCompleted] = useState(
    lostfound?.is_completed || 0
  );
  const [previewCover, setPreviewCover] = useState(lostfound?.cover || null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailLostFound(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (lostfound) {
      setEditedTitle(lostfound.title);
      setEditedDescription(lostfound.description);
      setEditedStatus(lostfound.status);
      setEditedCompleted(lostfound.is_completed);
      setPreviewCover(lostfound.cover);
    }
  }, [lostfound]);

  const handleFileChange = (event) => {
    if (!isCurrentUserItem) return; // Prevent non-owners from uploading
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewCover(previewURL);
      handleCoverUpload(file);
    }
  };

  const handleCoverUpload = async (file) => {
    if (!isCurrentUserItem) return; // Prevent non-owners from uploading
    setIsUploading(true);
    try {
      await api.postChangeCoverLostFound({
        id: lostfound.id,
        cover: file,
      });
      dispatch(asyncDetailLostFound(lostfound.id));
    } catch (error) {
      console.error("Failed to upload cover:", error.message);
    }
    setIsUploading(false);
  };

  const handleUploadClick = () => {
    if (!isCurrentUserItem) return; // Prevent non-owners from triggering upload
    fileInputRef.current.click();
  };

  const handleSaveChanges = () => {
    if (!isCurrentUserItem) return; // Prevent non-owners from saving changes
    onEditLostFound(
      lostfound.id,
      editedTitle,
      editedDescription,
      editedStatus,
      editedCompleted
    );
    setIsEditing(false);
  };

  let badgeCompleted = lostfound.is_completed
    ? "badge bg-success text-white ms-3"
    : "badge bg-warning text-dark ms-3";
  let badgeLabel = lostfound.is_completed ? "Selesai" : "Belum Selesai";

  let badgeStatus = "badge ";
  if (lostfound.status === "lost") {
    badgeStatus += " bg-danger text-white";
  } else if (lostfound.status === "found") {
    badgeStatus += " bg-info text-white";
  }

  return (
    <div className="card mt-3">
      <div className="card-body image-detail">
        {/* Cover Image */}
        <div
          style={{
            width: "300px",
            height: "300px",
            position: "relative",
            backgroundColor: "#f0f0f1",
            marginBottom: "5px",
            overflow: "hidden",
          }}
        >
          {previewCover ? (
            <img
              src={previewCover}
              alt="Cover"
              style={{
                borderRadius: "6px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          ) : (
            <p>
              <MdOutlineImageNotSupported />
              &nbsp; &nbsp;No cover image
            </p>
          )}
        </div>

        {/* Lost Found Details */}
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center mt-2 detail-header">
                <div className="d-flex badge-detail">
                  <span className={badgeStatus}>
                    {lostfound.status === "lost" ? "Lost" : "Found"}
                  </span>
                  <span className={`${badgeCompleted} ms-2`}>{badgeLabel}</span>
                </div>
                <h5 className="mb-0">{lostfound.title}</h5>
              </div>

              {isCurrentUserItem && (
                <div>
                  {/* "Edit" Button */}
                  <button
                    type="button"
                    onClick={() => setIsEditing((prevState) => !prevState)}
                    className="btn btn-sm btn-outline-warning me-2"
                  >
                    <FaPenToSquare /> {isEditing ? "Cancel Edit" : "Edit"}
                  </button>

                  {/* Update Cover Button */}
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleUploadClick}
                  >
                    <FaUpload /> {isUploading ? "Uploading..." : "Update Cover"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="d-none"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <div className="text-sm op-5 detail-txt">
                <FaClock />
                <span className="ps-1">{postedAt(lostfound.created_at)}</span>
                {/* Display author */}
                <span className="ms-2 text-muted">
                  {lostfound.author
                    ? `by ${lostfound.author.name}`
                    : "Author unknown"}
                </span>
              </div>
            </div>

            <hr />

            <div className="col-12 mt-3">
              {isEditing ? (
                <div>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">
                      Edit Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Edit Description
                    </label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      rows="3"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editStatus" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="editStatus"
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      <option value="found">Found</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editCompleted" className="form-label">
                      Selesai?
                    </label>
                    <select
                      className="form-select"
                      id="editCompleted"
                      value={editedCompleted}
                      onChange={(e) =>
                        setEditedCompleted(Number(e.target.value))
                      }
                    >
                      <option value={1}>Selesai</option>
                      <option value={0}>Belum Selesai</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveChanges}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>{lostfound.description}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LostFoundDetail.propTypes = {
  lostfound: PropTypes.shape(lostFoundItemShape).isRequired,
  onEditLostFound: PropTypes.func.isRequired,
};

export default LostFoundDetail;
