import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ onAuthLogin }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    onAuthLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="login-box">
        <div className="login-header">
          <h1>Lost & Found</h1>
          <p>Your go-to app for Lost & Founds</p>
        </div>
        <div className="log-form">
          <h1>Login now!</h1>
          <div className="form px-4">
            <div className="mb-3">
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={onEmailChange}
                className="form-control"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={onPasswordChange}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4 text-end b">
              <button type="submit" className="btn-login">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  onAuthLogin: PropTypes.func.isRequired,
};

export default LoginInput;
