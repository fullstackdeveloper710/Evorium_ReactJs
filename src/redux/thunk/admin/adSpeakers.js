import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import {
  hideBtnLoader,
  hideLoader,
  showBtnLoader,
  showLoader,
} from "../../reducers/common/appSlice";

const { adSpeakersList, adAddSpeaker, adDelSpeaker } = adminApi;

// get admin speakers list thunk
export const getAdminSpeakers = createAsyncThunk(
  "admin/getAdminSpeakers",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "get",
        url: `${adSpeakersList}?pageNo=${values?.pageNo}&pageSize=${values?.pageSize}`,
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

// add admin speakers thunk
export const addAdminSpeaker = createAsyncThunk(
  "admin/addAdminSpeaker",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values, pagination } = data;
    try {
      const config = {
        method: "post",
        url: `${adAddSpeaker}`,
        data: values,
      };
      dispatch(showLoader());
      const response = await httpsClient(config, adminAuthtoken);
      if (response) {
        const data = {
          adminAuthtoken,
          values: {
            ...pagination,
          },
        };
        dispatch(getAdminSpeakers(data));
      }
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete admin speaker thunk
export const deleteAdminSpeaker = createAsyncThunk(
  "admin/deleteAdminSpeaker",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "delete",
        url: `${adDelSpeaker}/${values.id}`,
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
