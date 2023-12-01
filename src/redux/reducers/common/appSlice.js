import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rootLoader: false,
  loader: false,
  btnLoader: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    showRootLoader: (state, action) => {
      state.rootLoader = true;
    },
    hideRootLoader: (state, action) => {
      state.rootLoader = false;
    },
    showLoader: (state, action) => {
      state.loader = true;
    },
    hideLoader: (state, action) => {
      state.loader = false;
    },
    showBtnLoader: (state, action) => {
      state.btnLoader = true;
    },
    hideBtnLoader: (state, action) => {
      state.btnLoader = false;
    },
  },
});

export const {
  showRootLoader,
  hideRootLoader,
  showLoader,
  hideLoader,
  showBtnLoader,
  hideBtnLoader,
} = appSlice.actions;
export default appSlice.reducer;
