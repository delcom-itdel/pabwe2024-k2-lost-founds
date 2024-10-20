import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDetailLostFound,
  asyncEditLostFound,
} from "../states/lostfound/action";
import LostFoundDetail from "../components/LostFoundDetail";

function LostFoundDetailPage() {
  const { id } = useParams();

  const { detailLostFound } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailLostFound(id));
    }
  }, [id, dispatch]);

  const handleEditLostFound = (
    id,
    title,
    description,
    status,
    is_completed
  ) => {
    dispatch(asyncEditLostFound(id, title, description, status, is_completed));

    Swal.fire({
      icon: "success",
      title: "Berhasil mengedit LostFound!",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <section>
      <div className="container pt-1">
        {detailLostFound != null ? (
          <LostFoundDetail
            lostfound={detailLostFound}
            onEditLostFound={handleEditLostFound}
          />
        ) : null}
      </div>
    </section>
  );
}

export default LostFoundDetailPage;
