// HomePage.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllLostFoundList from "../components/AllLostFoundList";
import MyLostFoundList from "../components/MyLostFoundList"; // Assuming this component is available
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

  const [showMyItems, setShowMyItems] = useState(false);

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

  const sortedLostFounds = lostfounds.slice().sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Filter for the current user's items
  const myLostFounds = sortedLostFounds.filter(
    (lostfound) => lostfound.user_id === currentUser?.id
  );

  return (
    <section>
      <div className="container pt-1">
        {/* Toggle buttons */}
        <div className="d-flex justify-content-start mb-3">
          <button
            className={`btn ${
              !showMyItems ? "btn-primary" : "btn-primary"
            } me-2`}
            onClick={() => setShowMyItems(false)}
          >
            All
          </button>
          <button
            className={`btn ${showMyItems ? "btn-primary" : "btn-primary"}`}
            onClick={() => setShowMyItems(true)}
          >
            My Lost & Founds
          </button>
        </div>

        {/* Conditionally render lists */}
        {!showMyItems ? (
          <AllLostFoundList
            lostfounds={sortedLostFounds}
            onDeleteLostFound={onDeleteLostFound}
          />
        ) : (
          <MyLostFoundList
            lostfounds={myLostFounds}
            onDeleteLostFound={onDeleteLostFound}
          />
        )}
      </div>
    </section>
  );
}

export default HomePage;
