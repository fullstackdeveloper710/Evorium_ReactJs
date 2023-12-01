import { createSlice } from "@reduxjs/toolkit";
import { deleteAdminTag, getAdminTags } from "../../thunk/admin/adTags";

const initialState = {
  adminTags: {
    data: [],
    count: 0,
  },
};

const adminTagsSlice = createSlice({
  name: "adminTagsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get admin tags list
    builder
      .addCase(getAdminTags.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminTags.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminTags = payload;
        state.status = true;
      })
      .addCase(getAdminTags.rejected, (state, action) => {
        state.status = false;
      });

    // delete admin tag
    builder
      .addCase(deleteAdminTag.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(deleteAdminTag.fulfilled, (state, action) => {
        const { meta } = action;
        state.adminTags = {
          ...state.adminTags,
          data: state.adminTags.data.filter(
            (item) => item._id !== meta.arg.values.id
          ),
        };
        state.status = true;
      })
      .addCase(deleteAdminTag.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminTagsSlice.actions;
export default adminTagsSlice.reducer;
