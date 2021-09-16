import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addJobDetails(action) {
  try {
    yield axios.post('/api/job/addDetails', action.payload);
    // console.log('post response is', response.data);
    
    // yield put({
    //   type: 'FETCH_JOB_DETAILS',
    //   payload: response.data
    // });
  } catch (error) {
    console.log('job details post request failed', error);
  }
}

function* fetchJobDetails(action) {
  try{
    const response = yield axios.get(`/api/job/jobsByHunt/${action.payload}`);
    console.log('result for jobs by hunt id is ', response.data);

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
    const response = yield axios.delete(`/api/job/deleteDetails/${action.payload}`);

    yield put({
      type: 'FETCH_JOB_DETAILS',
      payload: response.data
    })
  } catch (error) {
    
  }
}

function* fetchEditDetails(action) {
  try {
    let response = yield axios.get(`/api/job/jobDetails/${action.payload}`);

    yield put({
      type: 'SET_JOB',
      payload: response.data
    })
  } catch (error) {
    
  }
}

function* updateJobDetails(action) {
  try {
    yield axios.put('/api/job/updateDetails', action.payload);

    yield put({
      type: 'FETCH_JOB_DETAILS',
      payload: action.payload.jobHuntId
    })
  } catch (error) {
    console.log('UPDATE JOB ERROR ', error)
  }
}

function* fetchTotals(action) {
  try {
    let response = yield axios.get(`/api/job/totals/${action.payload}`);

    yield put({
      type: 'SET_TOTALS',
      payload: response.data
    })
  } catch (error) {
    console.log('FETCH TOTALS ERROR ', error)
  }
}

function* jobSaga() {
  yield takeLatest('ADD_JOB_DETAILS', addJobDetails);
  yield takeLatest('FETCH_JOB_DETAILS', fetchJobDetails);
  yield takeLatest('DELETE_JOB_DETAILS', deleteJobDetails)
  yield takeLatest('FETCH_EDIT_DETAILS', fetchEditDetails);
  yield takeLatest('UPDATE_JOB_DETAILS', updateJobDetails);
  yield takeLatest('FETCH_TOTALS', fetchTotals); 
}

export default jobSaga;