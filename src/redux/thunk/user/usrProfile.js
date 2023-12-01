import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { userApi } from "../../../services/apiEndpoints";
import { hideLoader, showLoader } from "../../reducers/common/appSlice";

const { usrEditProfile, usrMyAccount, usrUpdateLanguage } = userApi;

export const userLanguageUpdate = createAsyncThunk(
  "user/userLanguageUpdate",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;

    try {
      console.log("leanguage update")
      const config = {
        method: "post",
        url: `${usrUpdateLanguage}?language=${values}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, userAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userEditProfile = createAsyncThunk(
  "user/userEditProfile",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;
    try {
      const config = {
        method: "put",
        url: usrEditProfile,
        data: values,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, userAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getMyAccount = createAsyncThunk(
  "user/getMyAccount",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken } = data;
    console.log("data here ", data);
    try {
      const config = {
        method: "get",
        url: usrMyAccount,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, userAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
