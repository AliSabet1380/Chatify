import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userSlice";
import { messageReducer } from "./messageSlice";
import { sidebarUsersReducer } from "./sidebarUsersSlice";

const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
  sidebarUsers: sidebarUsersReducer,
});

const persistConfig = {
  key: "user",
  storage,
  version: 1,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
