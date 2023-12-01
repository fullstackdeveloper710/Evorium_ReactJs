import { createAsyncThunk } from "@reduxjs/toolkit";
import httpsClient from "../../../services/httpsClient";
import { userApi } from "../../../services/apiEndpoints";
import { hideLoader, showLoader } from "../../reducers/common/appSlice";

const { usrSpeakers} =
  userApi;

// get USER categories list thunk
export const getProgramSpeakersList = createAsyncThunk(
  "user/getProgramSpeakersList",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const config = {
        method: "get",
        url: `${usrSpeakers}`,
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