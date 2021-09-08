import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addJobDetails(action) {
  try {
    yield axios.post('/api/job/details', action.payload);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    // yield put({ type: 'SET_JOB_DETAILS', payload: response.data });
  } catch (error) {
    console.log('job post request failed', error);
  }
}

function* jobSaga() {
  yield takeLatest('ADD_JOB_DETAILS', addJobDetails);
}

export default jobSaga;