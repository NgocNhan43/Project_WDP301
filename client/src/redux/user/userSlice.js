import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //chứa trạng thái ban đầu của user
  currentUser: null, //chứa thông tin của người dùng hiện tại
  error: null, // chứa thông báo lỗi phát sinh nếu có
 loading: false, //xác định trạng thái đang tải false: trạng thái chờ
  // True: trạng thái thành công
};

const userSlice = createSlice({
  name: "user", // tên của slice là user
  initialState, // trạng thái ban đầu của slice
  reducers: {
    //Một đối tượng chứa các reducer để sử lý các hành động action (signInStart, signInSuccess,signInFailure)
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
