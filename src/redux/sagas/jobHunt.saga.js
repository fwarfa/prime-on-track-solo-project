import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchJobHunt() {
  try{
    const response = yield axios.get('/api/job/getHunt');
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

function* endJobHunt(action) {
  try {
    yield axios.put(`/api/job/endHunt/${action.payload}`);
  } catch (error) {
    console.log('END JOB HUNT ERROR ', error)
  }
}

function* jobHuntSaga() {
  yield takeLatest('FETCH_JOB_HUNT', fetchJobHunt);
  yield takeLatest('END_JOB_HUNT', endJobHunt);
}

export default jobHuntSaga;