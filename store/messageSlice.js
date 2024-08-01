import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
     counts:{}
  },
  reducers: {
    incrementMessageCount: (state, action) => {
      const { conversationId } = action.payload;
      state.counts[conversationId] = (state.counts[conversationId] || 0) + 1;
    },
    clearMessageCount: (state, action) => {
      const { conversationId } = action.payload;
      state.counts[conversationId] = 0;
    },
  },
});

export const { incrementMessageCount, clearMessageCount } = messageSlice.actions;
export const messageCount = (state) => state.message.counts;
export default messageSlice.reducer;