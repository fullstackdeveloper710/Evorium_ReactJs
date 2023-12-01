import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import { hideBtnLoader, hideLoader, showBtnLoader, showLoader } from "../../reducers/common/appSlice";

const { adCategories, adAddCategory, adDelCategory } = adminApi;

// get admin categories list thunk
export const getAdminCategories = createAsyncThunk(
  "admin/getAdminCategories",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "get",
        url: `${adCategories}?pageNo=${values?.pageNo}&pageSize=${values?.pageSize}`,
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

// add admin categories thunk
export const addAdminCategory = createAsyncThunk(
  "admin/addAdminCategory",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values, pagination } = data;
    try {
      const config = {
        method: "post",
        url: `${adAddCategory}`,
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
        dispatch(getAdminCategories(data));
      }
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete admin category thunk
export const deleteAdminCategory = createAsyncThunk(
  "admin/deleteAdminCategory",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { adminAuthtoken, values } = data;
    try {
      const config = {
        method: "delete",
        url: `${adDelCategory}/${values.id}`,
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
