import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { userApi } from "../../../services/apiEndpoints";
import { hideBtnLoader, showBtnLoader } from "../../reducers/common/appSlice";

const { usrMakePayment, usrPaymentConfirm } = userApi;

export const userMakePayment = createAsyncThunk(
  "user/userMakePayment",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: usrMakePayment,
        data: values,
      };
      dispatch(showBtnLoader());
      const response = await httpsClient(config, userAuthtoken);
      dispatch(hideBtnLoader());
      return response;
    } catch (error) {
      dispatch(hideBtnLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userPaymentConfirm = createAsyncThunk(
  "user/userPaymentConfirm",
  async (data, thunkAPI) => {
    // const { dispatch } = thunkAPI;
    const { userAuthtoken, values, cb } = data;
    try {
      const config = {
        method: "post",
        url: usrPaymentConfirm,
        data: values,
      };
      const response = await httpsClient(config, userAuthtoken);
      if (response.status) {
        cb();
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
