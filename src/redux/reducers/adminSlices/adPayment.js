import { createSlice } from "@reduxjs/toolkit";
import {
  filterAdminPaymentbyDate,
  getAdminPaymentList,
  searchAdminPaymentList,
} from "../../thunk/admin/adPayment";

const initialState = {
  adminPayments: {
    data: [],
    count: 0,
  },
};

const adminPaymentSlice = createSlice({
  name: "adminPaymentSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin user list
    builder
      .addCase(getAdminPaymentList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminPaymentList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminPayments = payload;
        state.status = true;
      })
      .addCase(getAdminPaymentList.rejected, (state, action) => {
        state.status = false;
      });

    //search admin user list
    builder
      .addCase(searchAdminPaymentList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(searchAdminPaymentList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminPayments = {
          ...state.adminPayments,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(searchAdminPaymentList.rejected, (state, action) => {
        state.status = false;
      });

    //filter admin user list by date
    builder
      .addCase(filterAdminPaymentbyDate.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(filterAdminPaymentbyDate.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminPayments = {
          ...state.adminPayments,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(filterAdminPaymentbyDate.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminPaymentSlice.actions;
export default adminPaymentSlice.reducer;
