export const resetState = () => ({
    type: 'RESET_STATE',
  });


  // userReducer.js
const initialState = {
    user_id: null,
    username: null,
    // other user-related state variables
  };
  
  const userReducerRx = (state = initialState, action) => {
    switch (action.type) {
      case 'RESET_STATE':
        return initialState; // Reset state to the initial values
      default:
        return state;
    }
  };
  
  export default userReducerRx;
  