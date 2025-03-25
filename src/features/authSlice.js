import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  isAuthenticated:  false, 

};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      const { name,email,accessToken,dob,bio,profilePicture,user_id,username} = action.payload;

    
    state.user = { name,email,accessToken,dob,bio,profilePicture,user_id,username}; 
    console.log("StateName==>",state)
    console.log("State.user",state.user)
    
  
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;  
      console.log("action.payload",action.payload)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout,userData } = authSlice.actions;
export default authSlice.reducer;
