import { createSlice } from "@reduxjs/toolkit";


const user = JSON.parse(sessionStorage.getItem("user")) || null;

const initialState = {
  isAuthenticated:  !!user, 
  user: user,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      const { email, name, password } = action.payload;

    
    state.user = { email, name, password }; 
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
