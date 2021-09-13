import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchJobHunt() {
  try{
    const response = yield axios.get('/api/job/hunt');
    console.log('response.data is ', response.data);

    yield put({
      type: 'SET_JOB_HUNT',
      payload: response.data
    })
  }
  catch(error) {
    console.log('get job hunt request failed', error);
  }
}

function* jobHuntSaga() {
//   yield takeLatest('ADD_JOB_DETAILS', addJobHunt);
  yield takeLatest('FETCH_JOB_HUNT', fetchJobHunt);
}

export default jobHuntSaga;