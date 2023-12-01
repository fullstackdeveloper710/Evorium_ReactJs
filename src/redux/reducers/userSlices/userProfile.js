import { createSlice } from "@reduxjs/toolkit";
import { getMyAccount, userEditProfile, userLanguageUpdate } from "../../thunk/user/usrProfile";

const initialState = {
  status: false,
  userDetails: {},
};

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: initialState,
  reducers: {
    someAsyncAction: (state, action) => {
      // Update your state here with the action payload
    },
  },
  extraReducers: (builder) => {
   
    // EDIT PROFILE REDUCER----------------------------
    builder.addCase(userEditProfile.fulfilled, (state, action) => {
      // state.userDetails = action.payload;
      state.status = "success";
    });
    builder.addCase(userEditProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(userEditProfile.pending, (state) => {
      state.status = "pending";
    });

    // MY ACCOUNT REDUCER----------------------------
    builder.addCase(getMyAccount.fulfilled, (state, action) => {
      state.userDetails = action.payload.user_details;
      state.status = "success";
    });
    builder.addCase(getMyAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(getMyAccount.pending, (state) => {
      state.status = "pending";
    });
  },
});

// export const {} = userProfileSlice.actions;
export default userProfileSlice.reducer;
