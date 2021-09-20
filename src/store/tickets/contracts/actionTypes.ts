import { Action } from 'redux'
import { LoadingState, IticketsState, Iticket } from './state'

export enum TicketsActionsType {
    FETCH_TICKETS = 'tickets/FETCH_TICKETS',
    SET_TICKETS = ' tickets/SET_TICKETS',
    SET_SORTED_TICKETS = ' tickets/SET_SORTED_TICKETS',
    SET_LOADING_STATE = 'tickets/SET_LOADING_STATE',
}

export interface FetchTicketsActionInterface extends Action<TicketsActionsType> {
    type: TicketsActionsType.FETCH_TICKETS
}

export interface SetTicketsActionInterface extends Action<TicketsActionsType> {
    type: TicketsActionsType.SET_TICKETS
    payload: IticketsState['tickets']
}

export interface SetSortedTicketsActionInterface extends Action<TicketsActionsType> {
    type: TicketsActionsType.SET_SORTED_TICKETS
    payload: Iticket[]
}

export interface SetTicketsLoadingStateActionInterface extends Action<TicketsActionsType> {
    type: TicketsActionsType.SET_LOADING_STATE
    payload: LoadingState
}

export type TicketActions =
    | FetchTicketsActionInterface
    | SetTicketsActionInterface
    | SetTicketsLoadingStateActionInterface
    | SetSortedTicketsActionInterface
