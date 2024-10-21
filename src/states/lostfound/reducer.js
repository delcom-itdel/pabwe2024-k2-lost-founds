import { ActionType } from "./action";

function userReducer(user = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_ME:
      return action.payload.user;
    default:
      return user;
  }
}

function lostfoundReducer(lostfounds = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_LOSTFOUNDS:
      return action.payload.lostfounds || [];

    case ActionType.EDIT_LOSTFOUND:
      return lostfounds.map((lostfound) =>
        lostfound.id === action.payload.lostfound.id
          ? action.payload.lostfound
          : lostfound
      );
    default:
      return lostfounds;
  }
}

function isAddLostFoundReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_LOSTFOUND:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteLostFoundReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_LOSTFOUND:
      return action.payload.status;
    default:
      return status;
  }
}

function isEditLostFoundReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.EDIT_LOSTFOUND:
      return action.payload.status;
    default:
      return status;
  }
}

function detailLostFoundReducer(lostfound = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_LOSTFOUND:
      return action.payload.lostfound;
    default:
      return lostfound;
  }
}

function statsDailyReducer(stats = {}, action = {}) {
  switch (action.type) {
    case ActionType.GET_STATS_DAILY:
      return action.payload.stats;
    default:
      return stats;
  }
}

function statsMonthlyReducer(stats = {}, action = {}) {
  switch (action.type) {
    case ActionType.GET_STATS_MONTHLY:
      return action.payload.stats;
    default:
      return stats;
  }
}

export {
  userReducer,
  lostfoundReducer,
  isAddLostFoundReducer,
  isDeleteLostFoundReducer,
  isEditLostFoundReducer,
  detailLostFoundReducer,
  statsDailyReducer,
  statsMonthlyReducer,
};
