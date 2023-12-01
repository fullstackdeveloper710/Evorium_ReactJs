import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../../thunk/admin/adAuth";

const initialState = {
  adminAuthtoken: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuthSlice",
  initialState: initialState,
  reducers: {
    adminLogout: (state, action) => {
      state.adminAuthtoken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        const { payload } = action;
        // state.loading = false;
        state.adminAuthtoken = payload.access_token;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.payload;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
