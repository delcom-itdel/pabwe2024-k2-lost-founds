import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/tools";
import { FaUpload } from "react-icons/fa6";

function UserDetail({ authLogin, onUserChangePhoto }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUserChangePhoto({ photoFile: file });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div id={authLogin.id} className="card profile-container">
      <div className="card-body text-center">
        <div className="d-flex flex-column align-items-center">
          <img
            className="rounded-circle"
            width={100}
            height={100}
            src={authLogin.photo}
            alt="Profile"
          />
          <h3 className="text-primary mt-3">{authLogin.name}</h3>

          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={handleUploadClick}
          >
            <FaUpload /> Ubah Photo Profile
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <hr />
        <table className="table table-bordered profile-table">
          <tbody>
            <tr>
              <th>Nama</th>
              <td>{authLogin.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{authLogin.email}</td>
            </tr>
            <tr>
              <th>Bergabung sejak</th>
              <td>{formatDate(authLogin.created_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

UserDetail.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onUserChangePhoto: PropTypes.func.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { authLoginShape };

export default UserDetail;
