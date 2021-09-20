import React from 'react'
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { selectSortedTickets } from '../store/tickets/selectors'
import { Iticket } from '../store/tickets/contracts/state'
import { setSortedTickets } from '../store/tickets/actionCreator'

interface StyledTabProps {
    label: string
    className?: string
    onClick?: () => void
}

const AntTabs = withStyles({
    root: {
        width: '100%',
    },
    indicator: {
        display: 'none',
    },
})(Tabs)

const AntTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            fontWeight: 600,
            border: '1px solid #ccc',
            color: theme.palette.secondary.main,
            background: '#fff',
            width: '100%',

            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$selected': {
                color: '#fff',
                backgroundColor: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightMedium,
            },
        },

        selected: {},
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(1.5),
    },
    leftBdrs: {
        borderRadius: '5px 0 0 5px',
    },
    rightBdrs: {
        borderRadius: '0 5px 5px 0',
    },
}))

export const ButtonsGroup: React.FC = React.memo((): React.ReactElement => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const tickets = useSelector(selectSortedTickets)

    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue)

    const handleSortBtnClick = (type: string): void => {
        if (type === 'fast') {
            const ticketsSorted: Iticket[] = tickets
                .concat()
                .sort((ticket1: Iticket, ticket2: Iticket): number => {
                    if (ticket1.segments[0]?.duration > ticket2.segments[0]?.duration) return 1

                    if (ticket1.segments[0]?.duration === ticket2.segments[0]?.duration) return 0

                    if (ticket1.segments[0]?.duration < ticket2.segments[0]?.duration) return -1

                    return 1
                })

            dispatch(setSortedTickets(ticketsSorted))
        }

        if (type === 'cheap') {
            const ticketsSorted: Iticket[] = tickets
                .concat()
                .sort((ticket1: Iticket, ticket2: Iticket): number => {
                    if (ticket1.price > ticket2.price) return 1
                    if (ticket1.price === ticket2.price) return 0
                    if (ticket1.price < ticket2.price) return -1
                    return 1
                })

            dispatch(setSortedTickets(ticketsSorted))
        }

        if (type === 'optimal') {
            const avgPrice = Math.round(
                tickets.reduce((sum, item) => (sum = sum + item.price), 0) / tickets.length,
            )

            const optimalFromPriceTickets: Iticket[] = tickets
                .filter(item => item.price < avgPrice / 2)
                .sort((ticket1: Iticket, ticket2: Iticket): number => {
                    if (ticket1.segments[0]?.duration > ticket2.segments[0]?.duration) return 1

                    if (ticket1.segments[0]?.duration === ticket2.segments[0]?.duration) return 0

                    if (ticket1.segments[0]?.duration < ticket2.segments[0]?.duration) return -1

                    return 1
                })
            dispatch(
                setSortedTickets(Array.from(new Set([...optimalFromPriceTickets, ...tickets]))),
            )
        }
    }

    const handleSortBtnClickCheap = () => handleSortBtnClick('cheap')
    const handleSortBtnClickFast = () => handleSortBtnClick('fast')
    const handleSortBtnClickOpti = () => handleSortBtnClick('optimal')

    return (
        <div className={classes.root}>
            <AntTabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="ant example">
                <AntTab
                    onClick={handleSortBtnClickCheap}
                    className={classes.leftBdrs}
                    label="САМЫЙ ДЕШЁВЫЙ"
                />
                <AntTab onClick={handleSortBtnClickFast} label="САМЫЙ БЫСТРЫЙ" />
                <AntTab
                    onClick={handleSortBtnClickOpti}
                    className={classes.rightBdrs}
                    label="ОПТИМАЛЬНЫЙ"
                />
            </AntTabs>
            <Typography className={classes.padding} />
        </div>
    )
})
