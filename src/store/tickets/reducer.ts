import produce, { Draft } from 'immer'
import { TicketActions } from './contracts/actionTypes'
import { TicketsActionsType } from './contracts/actionTypes'
import { LoadingState, IticketsState } from './contracts/state'

const initialTicketsState = {
    tickets: [],
    sortedTickets: [],
    loadingState: LoadingState.NEVER,
}

export const ticketReducer = produce((draft: Draft<IticketsState>, action: TicketActions) => {
    switch (action.type) {
        case TicketsActionsType.SET_TICKETS:
            draft.tickets = action.payload
            draft.loadingState = LoadingState.LOADED
            break
        case TicketsActionsType.SET_SORTED_TICKETS:
            draft.sortedTickets = action.payload
            break

        case TicketsActionsType.FETCH_TICKETS:
            draft.tickets = []
            draft.loadingState = LoadingState.LOADING
            break

        case TicketsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload
            break
    }
}, initialTicketsState)
