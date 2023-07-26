import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userDataType = {
  memberId: number;
  nickname: string;
  address: string | null;
  userImg: string;
  cash: number;
};

export type userState = {
  data: null | userDataType;
  isLogin: boolean;
};

const initialState: userState = {
  data: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action) {
      state.data = action.payload;
      state.isLogin = true;
    },
    logOut(state) {
      state.data = null;
      state.isLogin = false;
    },
    updateCashAmount(state, action: PayloadAction<number>) {
      if (state.data) {
        state.data.cash = action.payload;
      }
    },
  },
});

export const { logIn, logOut, updateCashAmount } = userSlice.actions;
export default userSlice;
