import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import {
  hideBtnLoader,
  hideLoader,
  showBtnLoader,
  showLoader,
} from "../../reducers/common/appSlice";

const { adUserList, adUserDetail, adDelUser, adSearchUser, adFilterUser } =
  adminApi;

// get admin users list thunk
export const getAdminUserList = createAsyncThunk(
  "admin/getAdminUserList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "get",
        url: `${adUserList}?pageNo=${values?.pageNo}&pageSize=${values?.pageSize}`,
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

// get admin user detail thunk
export const getAdminUserDetail = createAsyncThunk(
  "admin/getAdminUserDetail",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: `${adUserDetail}/id`,
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

// delete admin user detail thunk
export const deleteAdminUser = createAsyncThunk(
  "admin/deleteAdminUser",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "delete",
        url: `${adDelUser}/${values.id}`,
      };
      dispatch(showBtnLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideBtnLoader());
      return response;
    } catch (error) {
      dispatch(hideBtnLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// search admin users list thunk
export const searchAdminUserList = createAsyncThunk(
  "admin/searchAdminUserList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const {
      adminAuthtoken,
      query: { search },
    } = data;
    try {
      const config = {
        method: "get",
        url: `${adSearchUser}?query=${search}`,
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

// filter admin users list thunk
export const filterAdminUserbyDate = createAsyncThunk(
  "admin/filterAdminUserbyDate",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const {
      adminAuthtoken,
      query: { startDate, endDate },
    } = data;
    try {
      const config = {
        method: "get",
        url: `${adFilterUser}?startDate=${startDate}&endDate=${endDate}`,
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
