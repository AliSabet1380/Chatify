import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const sidebarUsersSlice = createSlice({
  name: "sidebarUsers",
  initialState,
  reducers: {
    setSidebarUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const sidebarUsersReducer = sidebarUsersSlice.reducer;
export const sidebarUsersActions = sidebarUsersSlice.actions;
