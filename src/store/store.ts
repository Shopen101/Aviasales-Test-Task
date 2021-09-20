import { applyMiddleware, compose, createStore } from 'redux'
import { ticketReducer } from './tickets/reducer'
import { IticketsState, LoadingState } from './tickets/contracts/state'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export interface RootState {
    tickets: IticketsState['tickets'],
    sortedTickets: IticketsState['tickets'],
    loadingState: LoadingState
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(ticketReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)
