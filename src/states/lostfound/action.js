import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_LOSTFOUNDS: "GET_LOSTFOUNDS",
  ADD_LOSTFOUND: "ADD_LOSTFOUND",
  DELETE_LOSTFOUND: "DELETE_LOSTFOUND",
  DETAIL_LOSTFOUND: "DETAIL_LOSTFOUND",
  EDIT_LOSTFOUND: "EDIT_LOSTFOUND",
  GET_STATS_DAILY: "GET_STATS_DAILY",
  GET_STATS_MONTHLY: "GET_STATS_MONTHLY",
};

function getLostFoundsActionCreator(lostfounds) {
  return {
    type: ActionType.GET_LOSTFOUNDS,
    payload: {
      lostfounds,
    },
  };
}

function addLostFoundActionCreator(status) {
  return {
    type: ActionType.ADD_LOSTFOUND,
    payload: {
      status,
    },
  };
}

function deleteLostFoundActionCreator(status) {
  return {
    type: ActionType.DELETE_LOSTFOUND,
    payload: {
      status,
    },
  };
}

function editLostFoundActionCreator(lostfound) {
  return {
    type: ActionType.EDIT_LOSTFOUND,
    payload: {
      lostfound,
    },
  };
}

function detailLostFoundActionCreator(lostfound) {
  return {
    type: ActionType.DETAIL_LOSTFOUND,
    payload: {
      lostfound,
    },
  };
}

function changeCoverLostFoundActionCreator(lostfound) {
  return {
    type: ActionType.DETAIL_LOSTFOUND,
    payload: {
      lostfound,
    },
  };
}

function getStatsDailyActionCreator(stats) {
  return {
    type: ActionType.GET_STATS_DAILY,
    payload: {
      stats,
    },
  };
}

function getStatsMonthlyActionCreator(stats) {
  return {
    type: ActionType.GET_STATS_MONTHLY,
    payload: {
      stats,
    },
  };
}

function asyncChangeCoverLostFound({ id, cover }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedLostFound = await api.postChangeCoverLostFound({
        id,
        cover,
      });
      dispatch(changeCoverLostFoundActionCreator(updatedLostFound));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncGetLostFounds(is_completed, is_me, status) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const lostfounds = await api.getAllLostFounds(
        is_completed,
        is_me,
        status
      );

      dispatch(getLostFoundsActionCreator(lostfounds));
      return lostfounds;
    } catch (error) {
      showErrorDialog(error.message);
      return undefined;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddLostFound({ title, description, status }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newLostFound = await api.postAddLostFound({
        title,
        description,
        status,
      });
      dispatch({
        type: ActionType.ADD_LOSTFOUND,
        payload: { status: true, lostfound: newLostFound },
      });
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteLostFound(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteLostFound(id);
      dispatch(deleteLostFoundActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncEditLostFound(id, title, description, status, is_completed) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateLostFound({
        id,
        title,
        description,
        status,
        is_completed,
      });

      const updatedLostFound = await api.getDetailLostFound(id);

      dispatch(detailLostFoundActionCreator(updatedLostFound));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailLostFound(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const lostfound = await api.getDetailLostFound(id);
      dispatch(detailLostFoundActionCreator(lostfound));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncGetStatsDaily(end_date, total_data) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const stats = await api.getStatsDaily({ end_date, total_data });
      dispatch(getStatsDailyActionCreator(stats));
    } catch (error) {
      showErrorDialog(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetStatsMonthly(end_date, total_data) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const stats = await api.getStatsMonthly({ end_date, total_data });
      dispatch(getStatsMonthlyActionCreator(stats));
    } catch (error) {
      showErrorDialog(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getLostFoundsActionCreator,
  asyncGetLostFounds,
  addLostFoundActionCreator,
  asyncAddLostFound,
  deleteLostFoundActionCreator,
  asyncDeleteLostFound,
  editLostFoundActionCreator,
  asyncEditLostFound,
  detailLostFoundActionCreator,
  asyncDetailLostFound,
  changeCoverLostFoundActionCreator,
  asyncChangeCoverLostFound,
  getStatsDailyActionCreator,
  asyncGetStatsDaily,
  getStatsMonthlyActionCreator,
  asyncGetStatsMonthly,
};
