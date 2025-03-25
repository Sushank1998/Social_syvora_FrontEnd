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
              console.log("flowwer==>",action.payload)
            }
          },
      
          followerRemove: (state, action) => {
            // Directly modify state.follow array, not state.searchName.follow
            state.follow = state.follow.filter(user => user.userId !== action.payload.userId);
          },
    }
})



export const {followerAdd,followerRemove} = followingSlice.actions;
export default followingSlice.reducer