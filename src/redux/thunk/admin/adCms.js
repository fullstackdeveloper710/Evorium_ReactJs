import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi, commonApi } from "../../../services/apiEndpoints";
import { hideRootLoader, showRootLoader } from "../../reducers/common/appSlice";

const {
  adAddSocialMedia,
  adAddAboutUs,
  adAddPrivacyPolicy,
  adAddTermAndConditions,
  adAddSupport,
} = adminApi;
const {
  adGetSocialMedia,
  adGetAboutUs,
  adGetPrivacyPolicy,
  adGetTermAndConditions,
  adGetSupport,
} = commonApi;

//add admin social links cms thunk
export const addAdminSocialLinks = createAsyncThunk(
  "admin/addAdminSocialLinks",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: adAddSocialMedia,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//get admin social links cms  thunk
export const getAdminSocialLinks = createAsyncThunk(
  "admin/getAdminSocialLinks",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: adGetSocialMedia,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//add admin about us cms thunk
export const addAdminAboutUs = createAsyncThunk(
  "admin/addAdminAboutUs",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: adAddAboutUs,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//get admin about us cms thunk
export const getAdminAboutUs = createAsyncThunk(
  "admin/getAdminAboutUs",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: adGetAboutUs,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//add admin privacy cms thunk
export const addAdminPrivacy = createAsyncThunk(
  "admin/addAdminPrivacy",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: adAddPrivacyPolicy,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//get admin privacy cms thunk
export const getAdminPrivacy = createAsyncThunk(
  "admin/getAdminPrivacy",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: adGetPrivacyPolicy,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//add admin terms and conditions cms thunk
export const addAdminTermAndConditions = createAsyncThunk(
  "admin/addAdminTermAndConditions",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: adAddTermAndConditions,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//get admin term and conditions cms thunk
export const getAdminTermAndConditions = createAsyncThunk(
  "admin/getAdminTermAndConditions",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: adGetTermAndConditions,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//add admin support cms thunk
export const addAdminSupport = createAsyncThunk(
  "admin/addAdminSupport",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: adAddSupport,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//get admin support cms thunk
export const getAdminSupport = createAsyncThunk(
  "admin/getAdminSupport",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken } = data;
    try {
      const config = {
        method: "get",
        url: adGetSupport,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, adminAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
