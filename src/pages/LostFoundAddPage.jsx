import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddLostFound,
  addLostFoundActionCreator,
} from "../states/lostfounds/action";
import LostFoundInput from "../components/LostFoundInput";
import { useNavigate } from "react-router-dom";

function LostFoundAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddLostFound = false } = useSelector((states) => states);

  useEffect(() => {
    if (isAddLostFound) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "LostFound berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addLostFoundActionCreator(false));
    }
  }, [isAddLostFound, navigate, dispatch]);

  const onAddLostFound = ({ title, description , status}) => {
    dispatch(asyncAddLostFound({ title, description, status}));
  };

  return (
    <section>
      <div className="container pt-1">
        <LostFoundInput onAddLostFound={onAddLostFound} />
      </div>
    </section>
  );
}

export default LostFoundAddPage;
