import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    follow: []
}

export const followingSlice = createSlice({
    name:"searchName",
    initialState,
    reducers:{
        followerAdd : (state, action) => {
            if (!state.follow.includes(action.payload)) {
              state.follow.push(action.payload);
            }
          },
        followerRemove : (state, action) => {
            state.follow = state.follow.filter((name) => name !== action.payload);
          },
    }
})



export const {followerAdd,followerRemove} = followingSlice.actions;
export default followingSlice.reducer