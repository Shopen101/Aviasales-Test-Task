import { call, put, takeEvery } from 'redux-saga/effects'
import { TicketsActionsType } from './contracts/actionTypes'
import { Iticket, LoadingState } from './contracts/state'
import { setLoadingState, setTickets, setSortedTickets } from './actionCreator'
import { AviaApi } from '../../api/index'

export function* fetchAddTicketRequest(): Generator<unknown, any, any> {
    try {
        const searchId = yield call(AviaApi.getSearchId)
        const tickets = yield call(AviaApi.getTickets, searchId)
        tickets.sort((ticket1: Iticket, ticket2: Iticket): number => {
            if (ticket1.price > ticket2.price) return 1
            if (ticket1.price === ticket2.price) return 0
            if (ticket1.price < ticket2.price) return -1
            return 1
        })
        yield put(setTickets(tickets))
        yield put(setSortedTickets(tickets))
    } catch (error) {
        yield put(setLoadingState(LoadingState.ERROR))
    }
}

export function* tweetsSaga() {
    yield takeEvery(TicketsActionsType.FETCH_TICKETS, fetchAddTicketRequest)
}
