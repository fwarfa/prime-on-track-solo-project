const editJobDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_JOB':
        return action.payload;
      case 'CLEAR_JOB':
        return [];
      default:
        return state;
    }
  };
  
  export default editJobDetailReducer;