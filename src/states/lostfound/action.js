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
  GET_ME: "GET_ME",
};

function getMeActionCreator(user) {
  return {
    type: ActionType.GET_ME,
    payload: {
      user,
    },
  };
}

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

function asyncGetMe() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const user = await api.getMe();
      dispatch(getMeActionCreator(user));
    } catch (error) {
      showErrorDialog(error.message);
    } finally {
      dispatch(hideLoading());
    }
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

// In action.js
function asyncGetLostFounds(is_completed, is_me, status) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const lostfounds = await api.getAllLostFounds(
        is_completed,
        is_me,
        status
      );

      // Retrieve the current user's ID from the state
      const state = getState();
      const currentUserId = state.currentUser ? state.currentUser.id : null;

      // Map over the lostfounds and add is_me field
      const updatedLostfounds = lostfounds.map((lostfound) => ({
        ...lostfound,
        is_me: lostfound.user_id === currentUserId ? 1 : 0,
      }));

      dispatch(getLostFoundsActionCreator(updatedLostfounds));
      return updatedLostfounds;
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

export {
  ActionType,
  asyncGetMe,
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
  getStatsMonthlyActionCreator,
};
