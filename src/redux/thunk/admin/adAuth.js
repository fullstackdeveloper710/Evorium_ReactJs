import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { adminApi } from "../../../services/apiEndpoints";
import { hideRootLoader, showRootLoader } from "../../reducers/common/appSlice";

const { adLogin } = adminApi;

// admin login thunk
export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { values } = data;
    try {
      const config = {
        method: "post",
        url: adLogin,
        data: values,
      };
      dispatch(showRootLoader());
      const response = await httpsClient(config);
      dispatch(hideRootLoader());
      return response;
    } catch (error) {
      dispatch(hideRootLoader());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
