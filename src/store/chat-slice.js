import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    selectedUser: null,
    sender: null,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelected(state, action) {
      state.selectedUser = action.payload;
    },
    setSender(state, action) {
      state.sender = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
