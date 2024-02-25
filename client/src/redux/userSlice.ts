import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  user?: {
    _id: string;
    username: string;
    avatar: string;
    fullName: string;
  } | null;
}
const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserLogin(state, action) {
      state.user = action.payload;
    },
    loggedOutUser(state) {
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
