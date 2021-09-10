const jobHuntReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_JOB_HUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default jobHuntReducer;