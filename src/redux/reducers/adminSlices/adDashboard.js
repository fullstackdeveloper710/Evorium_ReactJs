import { createSlice } from "@reduxjs/toolkit";
import { getAdminDashStats } from "../../thunk/admin/adDashboard";

const initialState = {
  adminDashboard: {
    data: {},
  },
};

const adminDashboardSlice = createSlice({
  name: "adminDashboardSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin dashboard
    builder
      .addCase(getAdminDashStats.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminDashStats.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminDashboard = payload;
        state.status = true;
      })
      .addCase(getAdminDashStats.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
