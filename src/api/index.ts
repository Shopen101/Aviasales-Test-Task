import axios from 'axios'
import { Iticket } from '../store/tickets/contracts/state';

interface IgetSearchId {
    searchId: string
}

interface IgetTickets {
    tickets: Iticket
}

export const AviaApi = {
    async getSearchId(): Promise<IgetSearchId> {
        const { data: { searchId } } = await axios.get('https://front-test.beta.aviasales.ru/search')
        return searchId
    },

    async getTickets(searchId: string): Promise<IgetTickets> {
        const {data: { tickets }} = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        return tickets
    }
}

