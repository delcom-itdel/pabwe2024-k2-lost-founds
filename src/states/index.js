import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";
import {
  lostfoundReducer,
  isAddLostFoundReducer,
  isDeleteLostFoundReducer,
  isEditLostFoundReducer,
  detailLostFoundReducer,
  statsDailyReducer,
  statsMonthlyReducer,
  userReducer,
} from "./lostfound/reducer";

const store = configureStore({
  reducer: {
    // Auth
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,

    // Profile
    isUserChangePhoto: isUserChangePhotoReducer,

    // Lost and Found
    currentUser: userReducer,
    lostfounds: lostfoundReducer,
    isAddLostFound: isAddLostFoundReducer,
    isDeleteLostFound: isDeleteLostFoundReducer,
    isEditLostFound: isEditLostFoundReducer,
    detailLostFound: detailLostFoundReducer,

    //Stats
    statsDaily: statsDailyReducer,
    statsMonthly: statsMonthlyReducer,
  },
});

export default store;
