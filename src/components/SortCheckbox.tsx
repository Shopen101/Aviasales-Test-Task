import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { ListOfCheckBox } from './ListOfCheckBox'
import { selectTickets } from '../store/tickets/selectors'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(0),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            boxShadow: '-1px 1px 6px 1px #D5D5D5',
            borderRadius: 10,
            maxWidth: '230px',
        },
        headerText: {
            padding: '20px 0 0 20px',
            fontSize: 14,
        },
    }),
)

export const SortCheckbox: React.FC = React.memo((): React.ReactElement => {
    const classes = useStyles()
    const allTickets = useSelector(selectTickets)

    return (
        <Paper className={classes.paper}>
            <Typography variant="subtitle1" align="left" className={classes.headerText}>
                КОЛИЧЕСТВО ПЕРЕСАДОК
            </Typography>
            <ListOfCheckBox allTickets={allTickets} />
        </Paper>
    )
})
