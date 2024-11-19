import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberId: null, // 存储 memberId 的初始值
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberId: (state, action) => {
      state.memberId = action.payload; // 更新 memberId
    },
  },
});

export const { setMemberId } = memberSlice.actions;

export default memberSlice.reducer;
