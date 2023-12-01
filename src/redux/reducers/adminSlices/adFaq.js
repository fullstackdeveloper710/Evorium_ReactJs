import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminFaq,
  deleteAdminFaq,
  getAdminFaqs,
  searchAdminFaqList,
} from "../../thunk/admin/adFaqs";

const initialState = {
  adminFaqs: {
    data: [],
    count: 0,
  },
};

const adminFaqsSlice = createSlice({
  name: "adminFaqsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add admin faq
    builder
      .addCase(addAdminFaq.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(addAdminFaq.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminFaqs = payload;
        state.status = true;
      })
      .addCase(addAdminFaq.rejected, (state, action) => {
        state.status = false;
      });
    // get admin faq list
    builder
      .addCase(getAdminFaqs.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminFaqs.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminFaqs = payload;
        state.status = true;
      })
      .addCase(getAdminFaqs.rejected, (state, action) => {
        state.status = false;
      });

    // delete admin faq
    builder
      .addCase(deleteAdminFaq.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(deleteAdminFaq.fulfilled, (state, action) => {
        const { meta } = action;
        state.adminFaqs = {
          ...state.adminFaqs,
          data: state.adminFaqs.data.filter(
            (item) => item._id !== meta.arg.values.id
          ),
        };
        state.status = true;
      })
      .addCase(deleteAdminFaq.rejected, (state, action) => {
        state.status = false;
      });

    // search admin faq
    builder
      .addCase(searchAdminFaqList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(searchAdminFaqList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminFaqs = {
          ...state.adminFaqs,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(searchAdminFaqList.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminFaqsSlice.actions;
export default adminFaqsSlice.reducer;
