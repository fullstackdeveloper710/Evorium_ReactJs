import { createSlice } from "@reduxjs/toolkit";
import { getProgramCategoriesList } from "../../thunk/user/usrCategories";
import { getProgramSpeakersList } from "../../thunk/user/usrSpeakers";

const initialState = {
  programsCategories: {
    data: [],
  },
  programsSpeakers: {
    data: [],
  },
};

const programSpeakerCategoriesListSlice = createSlice({
  name: "programSpeakerCategoriesListSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user program list
    builder
      .addCase(getProgramCategoriesList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getProgramCategoriesList.fulfilled, (state, action) => {
        const { payload } = action;

        state.programsCategories = payload;
              
        state.status = true;
      })
      .addCase(getProgramCategoriesList.rejected, (state, action) => {
        state.status = false;
      });

    builder
      .addCase(getProgramSpeakersList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getProgramSpeakersList.fulfilled, (state, action) => {
        const { payload } = action;
        state.programsSpeakers = payload;
        state.status = true;
      })
      .addCase(getProgramSpeakersList.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = userProgramsSlice.actions;
export default programSpeakerCategoriesListSlice.reducer;
