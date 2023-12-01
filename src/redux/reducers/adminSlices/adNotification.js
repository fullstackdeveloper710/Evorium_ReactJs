import { createSlice } from "@reduxjs/toolkit";
import { deleteNotification, deleteNotifications, getAdminNotifications } from "../../thunk/admin/adNotification";

const initialState = {
  adminNotification: {
    data: [],
  },
};

const adminNotificationSlice = createSlice({
  name: "adminNotificationSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin notification
    builder
      .addCase(getAdminNotifications.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminNotifications.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminNotification = payload;
        state.status = true;
      })
      .addCase(getAdminNotifications.rejected, (state, action) => {
        state.status = false;
      });



    //Delete single notification
    builder
    .addCase(deleteNotification.pending, (state) => {
      state.error = null;
      state.status = false;
    })
    .addCase(deleteNotification.fulfilled, (state, action) => {
      // const { meta } = action;
      // state.adminUsers = {
      //   ...state.adminUsers,
      //   data: state.adminUsers.data.filter(
      //     (item) => item._id !== meta.arg.values.id
      //   ),
      // };
      state.status = true;
    })
    .addCase(deleteNotification.rejected, (state, action) => {
      state.status = false;
    });



    //clear all the notifications

    builder
    .addCase(deleteNotifications.pending, (state) => {
      state.error = null;
      state.status = false;
    })
    .addCase(deleteNotifications.fulfilled, (state, action) => {
      // const { meta } = action;
      // state.adminUsers = {
      //   ...state.adminUsers,
      //   data: state.adminUsers.data.filter(
      //     (item) => item._id !== meta.arg.values.id
      //   ),
      // };
      state.status = true;
    })
    .addCase(deleteNotifications.rejected, (state, action) => {
      state.status = false;
    });

  },



  
});

// export const {} = adminDashboardSlice.actions;
export default adminNotificationSlice.reducer;
