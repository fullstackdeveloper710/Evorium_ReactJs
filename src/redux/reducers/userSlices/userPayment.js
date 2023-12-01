import { createSlice } from "@reduxjs/toolkit";
import {
  userMakePayment,
  userPaymentConfirm,
} from "../../thunk/user/usrPayment";
import { toast } from "react-toastify";

const initialState = {
  status: false,
};

const userPaymentSlice = createSlice({
  name: "userPaymentSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Make payment
    builder.addCase(userMakePayment.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(userMakePayment.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(userMakePayment.pending, (state) => {
      state.status = "pending";
    });

    // Make payment
    builder.addCase(userPaymentConfirm.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(userPaymentConfirm.fulfilled, (state, action) => {
      state.status = "success";
      toast.success("Payment done successfully.");
    });
    builder.addCase(userPaymentConfirm.pending, (state) => {
      state.status = "pending";
    });
  },
});

// export const {} = userProfileSlice.actions;
export default userPaymentSlice.reducer;
