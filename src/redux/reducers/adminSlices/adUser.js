import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdminUser,
  filterAdminUserbyDate,
  getAdminUserList,
  searchAdminUserList,
} from "../../thunk/admin/adUser";

const initialState = {
  adminUsers: {
    data: [],
    count: 0,
  },
};

const adminUserSlice = createSlice({
  name: "adminUserSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin user list
    builder
      .addCase(getAdminUserList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminUserList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminUsers = payload;
        state.status = true;
      })
      .addCase(getAdminUserList.rejected, (state, action) => {
        state.status = false;
      });

    //Delete admin user
    builder
      .addCase(deleteAdminUser.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        const { meta } = action;
        state.adminUsers = {
          ...state.adminUsers,
          data: state.adminUsers.data.filter(
            (item) => item._id !== meta.arg.values.id
          ),
        };
        state.status = true;
      })
      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.status = false;
      });

    //search admin user list
    builder
      .addCase(searchAdminUserList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(searchAdminUserList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminUsers = {
          ...state.adminUsers,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(searchAdminUserList.rejected, (state, action) => {
        state.status = false;
      });

    //filter admin user list by date
    builder
      .addCase(filterAdminUserbyDate.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(filterAdminUserbyDate.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminUsers = {
          ...state.adminUsers,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(filterAdminUserbyDate.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminUserSlice.actions;
export default adminUserSlice.reducer;
