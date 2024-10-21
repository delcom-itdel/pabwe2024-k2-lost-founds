import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddLostFound,
  addLostFoundActionCreator,
} from "../states/lostfound/action";
import LostFoundInput from "../components/LostFoundInput";
import { useNavigate } from "react-router-dom";

function LostFoundAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddLostFound = false } = useSelector((states) => states);

  useEffect(() => {
    if (isAddLostFound) {
      Swal.fire({
        icon: "success",
        title: "LostFound berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addLostFoundActionCreator(false));
    }
  }, [isAddLostFound, navigate, dispatch]);

  const onAddLostFound = ({ title, description, status }) => {
    dispatch(asyncAddLostFound({ title, description, status }));
  };

  return (
    <section className="split-container">
      <div className="left-side">
        <div className="left-content">
          <h1>Help Us Reunite Lost Items with Their Owners</h1>
          <p>
            Your contribution can make someone's day better! If you've found
            something, or lost something important, please provide the details
            below to help us reconnect it with the rightful owner.
          </p>
        </div>
      </div>
      <div className="right-side">
        <div className="form-container">
          <LostFoundInput onAddLostFound={onAddLostFound} />
        </div>
      </div>
    </section>
  );
}

export default LostFoundAddPage;
