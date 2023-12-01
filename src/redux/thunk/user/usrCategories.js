import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { userApi } from "../../../services/apiEndpoints";
import { hideLoader, showLoader } from "../../reducers/common/appSlice";

const { usrCategories} =
  userApi;

// get USER categories list thunk
export const getProgramCategoriesList = createAsyncThunk(
  "user/getProgramCategoriesList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const config = {
        method: "get",
        url: `${usrCategories}`,
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