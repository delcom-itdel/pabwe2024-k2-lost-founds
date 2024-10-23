import { useState } from "react";
import PropTypes from "prop-types";

function LostFoundInput({ onAddLostFound }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost"); // State untuk status dengan nilai default "lost"

  function handleOnAddLostFound(e) {
    e.preventDefault(); // Prevent page refresh
    if (title.trim() && description.trim()) {
      onAddLostFound({ title, description, status }); // Sertakan status
    }
  }

  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }

  function handleStatus({ target }) {
    setStatus(target.value);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Add Lost & Found</h3>
        <hr />
        <form onSubmit={handleOnAddLostFound}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Title of the Item
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>
          <div>
            <label htmlFor="inputBody" className="form-label">
              Please describe the item with as much detail as possible
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleDescription}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-add btn-primary">
              Add to Lost & Found
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

LostFoundInput.propTypes = {
  onAddLostFound: PropTypes.func.isRequired,
};

export default LostFoundInput;
