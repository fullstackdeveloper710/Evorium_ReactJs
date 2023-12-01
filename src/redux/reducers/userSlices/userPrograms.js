import { createSlice } from "@reduxjs/toolkit";
import {
  getMyProrgamsList,
  getUserProgramList,
  userFilterPrograms,
  userViewCount,
  getRecommendedPrograms,
  getFilteredPrograms,
} from "../../thunk/user/usrPrograms";

const initialState = {
  userFreePrograms: {
    data: [],
  },
  userPaidPrograms: {
    data: [],
  },
  userAZPrograms: {
    data: [],
  },
  userZAPrograms: {
    data: [],
  },
  userCategorynewPrograms: {
    data: [],
  },
  userCategoryproPrograms: {
    data: [],
  },
  userSpeakers1Programs: {
    data: [],
  },
  userSpeakers2Programs: {
    data: [],
  },
  userMyPrograms: {
    data: [],
  },
  userRecommendedPrograms: {
    data: [],
  },
  userFilteredProgram: {
    data: [],
  },
};

const userProgramsSlice = createSlice({
  name: "userProgramsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    //get filtered programs
    builder
      .addCase(getFilteredPrograms.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getFilteredPrograms.fulfilled, (state, action) => {
        const { payload } = action;

        state.userFilteredProgram = payload;

        state.status = true;
      })
      .addCase(getFilteredPrograms.rejected, (state, action) => {
        state.status = false;
      });

    //get programs with a specific category
    builder
      .addCase(getRecommendedPrograms.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getRecommendedPrograms.fulfilled, (state, action) => {
        const { payload } = action;

        state.userRecommendedPrograms = payload;

        state.status = true;
      })
      .addCase(getRecommendedPrograms.rejected, (state, action) => {
        state.status = false;
      });

    // get user program list
    builder
      .addCase(getUserProgramList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getUserProgramList.fulfilled, (state, action) => {
        const {
          meta: {
            arg: {
              values: { course_type },
            },
          },
          payload,
        } = action;
        if (course_type === "Free") {
          state.userFreePrograms = payload;
        } else {
          state.userPaidPrograms = payload;
        }
        state.status = true;
      })
      .addCase(getUserProgramList.rejected, (state, action) => {
        state.status = false;
      });

    //my program reducer

    builder
      .addCase(getMyProrgamsList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getMyProrgamsList.fulfilled, (state, action) => {
        const { payload } = action;
        state.userMyPrograms = payload;
        state.status = true;
      })
      .addCase(getMyProrgamsList.rejected, (state, action) => {
        state.status = false;
      });

    // filter programs reducer

    builder
      .addCase(userFilterPrograms.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(userFilterPrograms.fulfilled, (state, action) => {
        const {
          meta: {
            arg: {
              values: { sort_by, categories, speakers },
            },
          },
          payload,
        } = action;
        if (sort_by === "az") {
          state.userAZPrograms = payload;
        } else {
          state.userZAPrograms = payload;
        }
        if (categories === "new") {
          state.userCategorynewPrograms = payload;
        } else {
          state.userCategoryproPrograms = payload;
        }

        if (speakers === "simpson") {
          state.userSpeakers1Programs = payload;
        } else {
          state.userSpeakers2Programs = payload;
        }
        state.status = true;
      })
      .addCase(userFilterPrograms.rejected, (state, action) => {
        state.status = false;
      });

    // Edit view count
    builder.addCase(userViewCount.fulfilled, (state, action) => {
      // state.userDetails = action.payload;
      state.status = "success";
    });
    builder.addCase(userViewCount.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(userViewCount.pending, (state) => {
      state.status = "pending";
    });

    // Edit recent programs reducer
    // builder.addCase(userRecentProgram.fulfilled, (state, action) => {
    //   // state.userDetails = action.payload;
    //   state.status = "success";
    // });
    // builder.addCase(userRecentProgram.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.status = "failed";
    // });
    // builder.addCase(userRecentProgram.pending, (state) => {
    //   state.status = "pending";
    // });
  },
});

// export const {} = userProgramsSlice.actions;
export default userProgramsSlice.reducer;
