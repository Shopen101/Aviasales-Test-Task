import { spawn } from 'redux-saga/effects'
import { tweetsSaga } from './tickets/sagas'

export default function* rootSaga() {
    yield spawn(tweetsSaga)
}
