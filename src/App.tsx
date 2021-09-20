import React, { useEffect, useState } from 'react'

// Material UI components
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchTickets } from './store/tickets/actionCreator'
import { selectLoadingState, selectSortedTickets } from './store/tickets/selectors'

import logo from './assets/logo.svg'

// Components
import { SortCheckbox } from './components/SortCheckbox'
import { Ticket } from './components/Ticket'
import { ButtonsGroup } from './components/ButtonsGroup'
import { ShowFiveMore } from './components/ShowFiveMore'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: '#f3f7fa',
            height: '100vh',
            padding: '0 110px',
        },
        circular: {
            display: 'flex',
            justifyContent: 'center',
        },
    }),
)

function App() {
    const classes = useStyles()

    const dispatch = useDispatch()
    const loadingState = useSelector(selectLoadingState)
    const sortedTickets = useSelector(selectSortedTickets)
    const [ticketsOnPageCount, setTicketsOnPageCount] = useState<number>(5)
    
    useEffect(() => {
        dispatch(fetchTickets())
    }, [dispatch])

    const showMoreHandler = (): void => {
        setTicketsOnPageCount(ticketsOnPageCount + 5)
    }

    return (
        <div className="App">
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item container justifyContent="center" xs={12}>
                            <Box mt={3}>
                                <img src={logo} alt="logo Aviasales" />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <SortCheckbox />
                        </Grid> 
                        <Grid item xs={8}>
                            <ButtonsGroup />
                            {loadingState === 'LOADING' || loadingState === 'NEVER' ? (
                                <Box mb={3} className={classes.circular}>
                                    <CircularProgress />
                                </Box>
                            ) : loadingState === 'ERROR' ? (
                                'ошибка сервера'
                            ) : (
                                <>
                                    {sortedTickets.map((ticket, index) => (
                                        index < ticketsOnPageCount &&
                                        <Ticket
                                            key={`${
                                                ticket.price
                                            }__${new Date().toString()}__${index}`}
                                            price={ticket.price}
                                            segments={ticket.segments}
                                        />
                                    ))}
                                    <ShowFiveMore onClick={showMoreHandler} />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    )
}

export default App
