import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  checkedArr: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    findTask: (state, action) => {
      state.searchText = action.payload;
    },

    projectArr: (state, action) => {
      const index = state.checkedArr.indexOf(action.payload);
      if (index > -1 && state.checkedArr.length > 0) {
        console.log("I am splice");
        state.checkedArr.splice(index, 1);
      } else {
        console.log("I am pushed");
        state.checkedArr.push(action.payload);
      }
      //   state.checkedArr.push(action.payload);
    },
  },
});

export const { findTask, projectArr } = filterSlice.actions;
export default filterSlice.reducer;
