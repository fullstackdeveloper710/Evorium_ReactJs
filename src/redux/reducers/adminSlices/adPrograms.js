import { createSlice } from "@reduxjs/toolkit";
import {
  addAdminProgram,
  deleteAdminProgram,
  getAdminProgramList,
  searchAdminProgram,
  updateAdminProgram,
} from "../../thunk/admin/adPrograms";

const initialState = {
  adminPrograms: {
    data: [],
    count: 0,
  },
};

const adminProgramsSlice = createSlice({
  name: "adminProgramsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get admin program list
    builder
      .addCase(getAdminProgramList.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(getAdminProgramList.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminPrograms = payload;
        state.status = true;
      })
      .addCase(getAdminProgramList.rejected, (state, action) => {
        state.status = false;
      });

    //search admin program
    builder
      .addCase(searchAdminProgram.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(searchAdminProgram.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminPrograms = {
          ...state.adminPrograms,
          data: payload.data,
        };
        state.status = true;
      })
      .addCase(searchAdminProgram.rejected, (state, action) => {
        state.status = false;
      });

    //add admin program
    builder
      .addCase(addAdminProgram.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(addAdminProgram.fulfilled, (state, action) => {
        state.status = true;
      })
      .addCase(addAdminProgram.rejected, (state, action) => {
        state.status = false;
      });

    //delete admin program
    builder
      .addCase(deleteAdminProgram.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(deleteAdminProgram.fulfilled, (state, action) => {
        const { meta } = action;
        state.adminPrograms = {
          ...state.adminPrograms,
          data: state.adminPrograms.data.filter(
            (item) => item._id !== meta.arg.values.id
          ),
        };
        state.status = true;
      })
      .addCase(deleteAdminProgram.rejected, (state, action) => {
        state.status = false;
      });

    //update admin program
    builder
      .addCase(updateAdminProgram.pending, (state) => {
        state.error = null;
        state.status = false;
      })
      .addCase(updateAdminProgram.fulfilled, (state, action) => {
        state.status = true;
      })
      .addCase(updateAdminProgram.rejected, (state, action) => {
        state.status = false;
      });
  },
});

// export const {} = adminProgramsSlice.actions;
export default adminProgramsSlice.reducer;
