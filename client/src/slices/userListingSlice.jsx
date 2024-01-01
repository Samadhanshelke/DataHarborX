import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userList:[]
};

const userListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {
   
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
  },
});

export const { setLoading, setUserList } = userListSlice.actions;

export default userListSlice.reducer;