import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import { hideLoader, showLoader } from "../../reducers/common/appSlice";

const {
  adGetPaymentList,
  adSearchPayment,
  adFilterPayment,
  adGetPaymentDetail,
} = adminApi;

// get admin Payment list thunk
export const getAdminPaymentList = createAsyncThunk(
  "admin/getAdminPaymentList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: `${adGetPaymentList}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get admin payment detail thunk
export const getAdminPaymentDetail = createAsyncThunk(
  "admin/getAdminPaymentDetail",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: `${adGetPaymentDetail}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// search admin payment list thunk
export const searchAdminPaymentList = createAsyncThunk(
  "admin/searchAdminPaymentList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const {
      adminAuthtoken,
      query: { search },
    } = data;
    try {
      const config = {
        method: "get",
        url: `${adSearchPayment}?query=${search}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// filter admin payment list thunk
export const filterAdminPaymentbyDate = createAsyncThunk(
  "admin/filterAdminPaymentbyDate",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const {
      adminAuthtoken,
      query: { startDate, endDate },
    } = data;
    try {
      const config = {
        method: "get",
        url: `${adFilterPayment}?startDate=${startDate}&endDate=${endDate}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
