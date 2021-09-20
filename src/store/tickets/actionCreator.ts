import {
    SetTicketsLoadingStateActionInterface,
    SetTicketsActionInterface,
    SetSortedTicketsActionInterface,
    FetchTicketsActionInterface,
} from './contracts/actionTypes'
import { LoadingState, Iticket } from './contracts/state'
import { TicketsActionsType } from './contracts/actionTypes'

export const setTickets = (payload: Iticket[]): SetTicketsActionInterface => ({
    type: TicketsActionsType.SET_TICKETS,
    payload,
})

export const setSortedTickets = (payload: Iticket[]): SetSortedTicketsActionInterface => ({
    type: TicketsActionsType.SET_SORTED_TICKETS,
    payload,
})

export const fetchTickets = (): FetchTicketsActionInterface => ({
    type: TicketsActionsType.FETCH_TICKETS,
})

export const setLoadingState = (payload: LoadingState): SetTicketsLoadingStateActionInterface => ({
    type: TicketsActionsType.SET_LOADING_STATE,
    payload,
})
