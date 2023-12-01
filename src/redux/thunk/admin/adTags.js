import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import { hideBtnLoader, hideLoader, showBtnLoader, showLoader } from "../../reducers/common/appSlice";

const { adTagsList, adAddTags, adDelTag } = adminApi;

// get admin categories list thunk
export const getAdminTags = createAsyncThunk(
  "admin/getAdminTags",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "get",
        url: `${adTagsList}?pageNo=${values?.pageNo}&pageSize=${values?.pageSize}`,
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

// add admin tags thunk
export const addAdminTags = createAsyncThunk(
  "admin/addAdminTags",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values, pagination } = data;
    try {
      const config = {
        method: "post",
        url: `${adAddTags}`,
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
        dispatch(getAdminTags(data));
      }
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete admin Tag thunk
export const deleteAdminTag = createAsyncThunk(
  "admin/deleteAdminTag",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "delete",
        url: `${adDelTag}/${values.id}`,
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
