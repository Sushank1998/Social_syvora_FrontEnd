import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: []
}

const addPost = createSlice({
    name:"photo",
    initialState,
    reducers:{
        addphoto : (state,action)=>{
            const {description,image} = action.payload
            state.item.push({description,image})
        },
        removePhoto: (state, action) => {
            state.item = state.item.filter((_, idx) => idx !== action.payload);
          },
    }
})

export const {addphoto,removePhoto} = addPost.actions;
export default addPost.reducer