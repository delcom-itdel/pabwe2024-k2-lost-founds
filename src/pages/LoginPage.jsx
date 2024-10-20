import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { asyncSetAuthLogin } from "../states/authLogin/action";

function LoginPage() {
  const dispatch = useDispatch();

  const onAuthLogin = ({ email, password }) => {
    dispatch(asyncSetAuthLogin({ email, password }));
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <LoginInput onAuthLogin={onAuthLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
