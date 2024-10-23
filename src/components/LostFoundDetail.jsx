import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { lostFoundItemShape } from "./AllLostFoundItem";
import { postedAt } from "../utils/tools";
import { FaClock, FaPenToSquare, FaUpload } from "react-icons/fa6";
import { MdOutlineImageNotSupported } from "react-icons/md";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { asyncDetailLostFound } from "../states/lostfound/action";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal

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

  const containerHeight = isEditing ? "auto" : "300px"; // Expands to fit content when editing

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
      Swal.fire({
        icon: "success",
        title: "Berhasil mengubah gambar cover!",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.error("Failed to upload cover:", error.message);
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah gambar cover!",
        text: error.message,
      });
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
    ? "badge bg-success text-white ms-2"
    : "badge bg-warning text-dark ms-2";
  let badgeLabel = lostfound.is_completed ? "Selesai" : "Belum Selesai";

  let badgeStatus = "badge ";
  if (lostfound.status === "lost") {
    badgeStatus += "bg-danger text-white";
  } else if (lostfound.status === "found") {
    badgeStatus += "bg-info text-white";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* Container with flexbox for two-column layout */}
        <div
          className="d-flex align-items-center lost-found-container"
          style={{ height: containerHeight }} // Apply dynamic height here
        >
          {/* Left Column - Cover Image */}
          <div
            className="cover-image-container"
            style={{
              flex: "1",
              height: "100%",
              backgroundColor: "#f0f0f1",
              overflow: "hidden",
            }}
          >
            {previewCover ? (
              <img
                src={previewCover}
                alt="Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <MdOutlineImageNotSupported size={64} />
                <p>No image</p>
              </div>
            )}
          </div>

          {/* Right Column - Lost Found Details */}
          <div className="ms-3 right-column" style={{ flex: "1" }}>
            <div className="d-flex justify-content-between align-items-center">
              {/* Title and Badges */}
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-3">{lostfound.title}</h5>
                <span className={badgeStatus}>
                  {lostfound.status === "lost" ? "Lost" : "Found"}
                </span>
                <span className={badgeCompleted}>{badgeLabel}</span>
              </div>

              {/* Action Buttons */}
              {isCurrentUserItem && (
                <div>
                  <button
                    type="button"
                    onClick={() => setIsEditing((prevState) => !prevState)}
                    className="btn btn-sm btn-outline-warning me-2"
                  >
                    <FaPenToSquare /> {isEditing ? "Cancel Edit" : "Edit"}
                  </button>

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

            <div className="text-sm text-muted mt-2">
              <FaClock />
              <span className="ps-1">{postedAt(lostfound.created_at)}</span>
              <span className="ms-2 text-muted">
                {lostfound.author
                  ? `by ${lostfound.author.name}`
                  : "Author unknown"}
              </span>
            </div>

            <hr />

            <div className="col-12">
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
