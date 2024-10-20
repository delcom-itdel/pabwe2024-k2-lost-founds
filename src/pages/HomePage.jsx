import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LostFoundList from "../components/LostFoundList";
import {
  asyncGetLostFounds,
  asyncDeleteLostFound,
  asyncGetMe,
  deleteLostFoundActionCreator,
} from "../states/lostfound/action";

function HomePage() {
  const {
    lostfounds = [],
    isDeleteLostFound = false,
    currentUser,
  } = useSelector((state) => ({
    lostfounds: state.lostfounds,
    isDeleteLostFound: state.isDeleteLostFound,
    currentUser: state.currentUser,
  }));

  const queryParams = new URLSearchParams(location.search);
  const is_completed = queryParams.get("is_completed") || "";
  const is_me = queryParams.get("is_me") || "";
  const status = queryParams.get("status") || "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleteLostFound) {
      Swal.fire({
        icon: "success",
        title: "LostFound berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteLostFoundActionCreator(false));
    }
    dispatch(asyncGetLostFounds(is_completed, is_me, status));
  }, [dispatch, isDeleteLostFound, is_completed]);

  useEffect(() => {
    dispatch(asyncGetMe());
  }, [dispatch]);

  const onDeleteLostFound = (id) => {
    dispatch(asyncDeleteLostFound(id));
  };

  return (
    <section>
      <div className="container pt-1">
        <LostFoundList
          lostfounds={lostfounds || []}
          onDeleteLostFound={onDeleteLostFound}
        ></LostFoundList>
      </div>
    </section>
  );
}

export default HomePage;
