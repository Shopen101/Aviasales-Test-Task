import { RootState } from '../store'
import { LoadingState, Iticket } from './contracts/state'

export const selectTickets = (state: RootState): Iticket[] => state.tickets
export const selectSortedTickets = (state: RootState): Iticket[] => state.sortedTickets
export const selectLoadingState = (state: RootState): LoadingState => state.loadingState