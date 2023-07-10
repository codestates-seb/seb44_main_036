import { createSlice } from '@reduxjs/toolkit';

type userDataType = {
  nickname: string;
  address: string | null;
  userImg: string;
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
      // state.data = action.payload;
      state.data = {
        nickname: 'eyo25',
        address: null,
        userImg:
          'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/301699229_495029505958367_2122837022415143500_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8fX5M9O1SbMAX-n-qiV&_nc_ht=scontent-gmp1-1.xx&oh=00_AfAHUTKiZrB-LKlTbaCvEDDB5k3mwj-M97Y65Rdn7DXTCw&oe=64AFC6D7',
      };
      state.isLogin = true;
    },
    logOut(state, action) {
      state.data = null;
      state.isLogin = false;
    },
  },
});

export default userSlice;
