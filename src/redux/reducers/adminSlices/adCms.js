import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminAboutUs,
  addAdminPrivacy,
  addAdminSocialLinks,
  addAdminSupport,
  addAdminTermAndConditions,
  getAdminAboutUs,
  getAdminPrivacy,
  getAdminSocialLinks,
  getAdminSupport,
  getAdminTermAndConditions,
} from "../../thunk/admin/adCms";

const initialState = {
  socialLinks: {},
  aboutUs: {},
  privacyPolicy: {},
  termAndConditions: {},
  support: {},
};

const adminCmsSlice = createSlice({
  name: "adminCmsSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    //add social media links cms
    builder
      .addCase(addAdminSocialLinks.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addAdminSocialLinks.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addAdminSocialLinks.rejected, (state, action) => {
        state.loading = false;
      });

    //get social media links cms
    builder
      .addCase(getAdminSocialLinks.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdminSocialLinks.fulfilled, (state, action) => {
        const { payload } = action;
        state.socialLinks = payload;
        state.loading = true;
      })
      .addCase(getAdminSocialLinks.rejected, (state, action) => {
        state.loading = false;
      });

    //add about us cms
    builder
      .addCase(addAdminAboutUs.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addAdminAboutUs.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addAdminAboutUs.rejected, (state, action) => {
        state.loading = false;
      });

    //get about us cms
    builder
      .addCase(getAdminAboutUs.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdminAboutUs.fulfilled, (state, action) => {
        const { payload } = action;
        state.aboutUs = payload;
        state.loading = true;
      })
      .addCase(getAdminAboutUs.rejected, (state, action) => {
        state.loading = false;
      });

    //add privacy policy cms
    builder
      .addCase(addAdminPrivacy.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addAdminPrivacy.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addAdminPrivacy.rejected, (state, action) => {
        state.loading = false;
      });

    //get privacy policy us cms
    builder
      .addCase(getAdminPrivacy.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdminPrivacy.fulfilled, (state, action) => {
        const { payload } = action;
        state.privacyPolicy = payload;
        state.loading = true;
      })
      .addCase(getAdminPrivacy.rejected, (state, action) => {
        state.loading = false;
      });

    //add terms and conditions cms
    builder
      .addCase(addAdminTermAndConditions.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addAdminTermAndConditions.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addAdminTermAndConditions.rejected, (state, action) => {
        state.loading = false;
      });

    //get terms and conditions cms
    builder
      .addCase(getAdminTermAndConditions.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdminTermAndConditions.fulfilled, (state, action) => {
        const { payload } = action;
        state.termAndConditions = payload;
        state.loading = true;
      })
      .addCase(getAdminTermAndConditions.rejected, (state, action) => {
        state.loading = false;
      });

    //add support cms
    builder
      .addCase(addAdminSupport.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addAdminSupport.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addAdminSupport.rejected, (state, action) => {
        state.loading = false;
      });

    //get support cms
    builder
      .addCase(getAdminSupport.pending, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdminSupport.fulfilled, (state, action) => {
        const { payload } = action;
        state.support = payload;
        state.loading = true;
      })
      .addCase(getAdminSupport.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const {} = adminCmsSlice.actions;
export default adminCmsSlice.reducer;
