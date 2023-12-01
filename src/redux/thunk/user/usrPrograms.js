import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { userApi } from "../../../services/apiEndpoints";
import { hideLoader, hideRootLoader, showLoader, showRootLoader } from "../../reducers/common/appSlice";

const {
  usrPrograms,
  usrFilterPrograms,
  usrViewCount,
  usrRecentProgram,
  usrMyPrograms,
} = userApi;

//get filtered programs results

export const getFilteredPrograms = createAsyncThunk(
  "user/getFilteredPrograms",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken , filter } = data;
    console.log(filter,"data")
 
    try {
      const config = {
        method: "get",
        url: `${usrFilterPrograms}?categories=${filter.categories}?speakers=${filter.speakers}`,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config, userAuthtoken);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


//get Programs on the basis of category for you might like this also

export const getRecommendedPrograms = createAsyncThunk(
  "user/getRecommendedPrograms",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { categories, userAuthtoken } = data;

    console.log(categories);
    try {
      const config = {
        method: "get",
        url: `${usrFilterPrograms}?categories=${categories}`,
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

// get USER categories list thunk
export const getUserProgramList = createAsyncThunk(
  "user/getUserProgramList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { values } = data;
    try {
      const config = {
        method: "get",
        url: `${usrPrograms}?course_type=${values?.course_type}`,
      };
      dispatch(showLoader());
      const response = await httpsClient(config);
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//my purchased program list
export const getMyProrgamsList = createAsyncThunk(
  "user/MyProgramList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken } = data;

    console.log(userAuthtoken, "datahshshsh");

    try {
      const config = {
        method: "get",
        url: `${usrMyPrograms}`,
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

// filter programs
export const userFilterPrograms = createAsyncThunk(
  "user/userFilterPrograms",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;
    try {
      const config = {
        method: "get",
        url: `${usrFilterPrograms}?categories=${values?.categories}&speakers=${values.speakers}&sort_by=${values.sort_by}`,
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

//User view count thunk
export const userViewCount = createAsyncThunk(
  "user/userViewCount",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: usrViewCount,
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

// Recent programs thunk

export const userRecentProgram = createAsyncThunk(
  "user/userRecentProgram",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { userAuthtoken, values } = data;
    try {
      const config = {
        method: "post",
        url: usrRecentProgram,
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
