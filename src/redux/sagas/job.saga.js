import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addJobDetails(action) {
  try {
    yield axios.post('/api/job/details', action.payload);
    yield put({
      type: 'FETCH_JOB_DETAILS'
    });
  } catch (error) {
    console.log('job details post request failed', error);
  }
}

function* fetchJobDetails() {
  try{
    const response = yield axios.get('/api/job/details');
    console.log('response.data is ', response.data);

    yield put({
      type: 'SET_JOB_DETAILS',
      payload: response.data
    })
  }
  catch(error) {
    console.log('get job details request failed', error);
  }
}

function* deleteJobDetails(action) {
  try {
    yield axios.delete(`/api/job/details/${action.payload}`);

    yield put({
      type: 'FETCH_JOB_DETAILS'
    })
  } catch (error) {
    
  }
}

function* jobSaga() {
  yield takeLatest('ADD_JOB_DETAILS', addJobDetails);
  yield takeLatest('FETCH_JOB_DETAILS', fetchJobDetails);
  yield takeLatest('DELETE_JOB_DETAILS', deleteJobDetails)
}

export default jobSaga;