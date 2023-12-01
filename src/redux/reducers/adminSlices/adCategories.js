import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
} from "../../thunk/admin/adCategories";

const initialState = {
  adminCategories: {
    data: [],
    count: 0,
  },
};

const adminCategoriesSlice = createSlice({
  name: "adminCategoriesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin categories list
    builder
      .addCase(getAdminCategories.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminCategories.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminCategories = payload;
        state.status = true;
      })
      .addCase(getAdminCategories.rejected, (state, action) => {
        state.status = false;
      });

    //add admin category
    builder
      .addCase(addAdminCategory.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(addAdminCategory.fulfilled, (state, action) => {
        state.status = true;
      })
      .addCase(addAdminCategory.rejected, (state, action) => {
        state.status = false;
      });

    //delete admin category
    builder
      .addCase(deleteAdminCategory.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(deleteAdminCategory.fulfilled, (state, action) => {
        const { meta } = action;
        state.adminCategories = {
          ...state.adminCategories,
          data: state.adminCategories.data.filter(
            (item) => item._id !== meta.arg.values.id
          ),
        };
        state.status = true;
      })
      .addCase(deleteAdminCategory.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminCategoriesSlice.actions;
export default adminCategoriesSlice.reducer;
