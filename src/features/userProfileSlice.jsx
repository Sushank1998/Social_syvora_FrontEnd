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
            console.log("action.payload_userProfileSlice_ss==>",action.payload)
        },
        updateProfilePicturePx: (state, action) => {
            state.user.profilePicture = action.payload;
          },

          updateProfileDataPx: (state, action) => {
            state.user.bio = action.payload;
          },  
    }
})



export const {userProfile,updateProfilePicturePx,updateProfileDataPx} = userProfileSlice.actions;
export default userProfileSlice.reducer;