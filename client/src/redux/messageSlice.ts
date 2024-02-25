import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const messageReducer = messageSlice.reducer;
export const messageActions = messageSlice.actions;
