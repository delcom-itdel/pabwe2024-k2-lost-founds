import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ onAuthRegister }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    onAuthRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="register-box">
        <div className="register-header">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
        </div>
        <div className="regis-form">
          <h1>Welcome!</h1>
          <div className="mb-3">
          <box-icon type='solid' name='user'></box-icon>
            <input
              type="text"
              id="inputName"
              value={name}
              onChange={onNameChange}
              className="form-control"
              placeholder="Name"
              required
            />
          </div>

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
          <div className="mb-4 text-end">
            <button type="submit" className="btn-signup">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  onAuthRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
