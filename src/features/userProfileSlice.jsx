import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    userProfile: {}
}

export const userProfileSlice = createSlice({
    name:"userProfile",
    initialState,
    reducers: {
        userProfile: (state,action)=>{
            const { email, username, profilePicture,dob,bio } = action.payload;
            
            state.user = { email, username, profilePicture,dob,bio }; 
            console.log("action.payload_userProfileSlice_",action.payload)
        }
    }
})

export const {userProfile} = userProfileSlice.actions;
export default userProfileSlice.reducer;