import { createSlice } from "@reduxjs/toolkit";
// Created Redux Reducer For Handling user heading data
export const userSlice = createSlice({
  name: "user",
  initialState: {
    menu_content_fetched: false,
    cart_items_fetched: false,
    wishlist_items_fetched: false,
    ordered_items_fetched: false,
    wishlistData: [],
    orderedItems: [],
  },
  reducers: {
    set_data_fetched: (state, action) => {
      let modifiedObj = { ...state, ...action.payload };
      return modifiedObj;
    },
  },
});
export const { set_data_fetched } = userSlice.actions;
export const selectUser = (state) => state.user;
// This function is for accessing user data
export default userSlice.reducer;
