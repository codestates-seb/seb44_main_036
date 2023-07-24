import { createSlice } from '@reduxjs/toolkit';

type userDataType = {
  memberId: string;
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
  },
});

export default userSlice;
