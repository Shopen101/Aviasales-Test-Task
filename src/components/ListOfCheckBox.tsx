import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import clsx from 'clsx'

import CheckIcon from '@material-ui/icons/Check'
import { useDispatch, useSelector } from 'react-redux'
import { selectSortedTickets } from '../store/tickets/selectors'
import { Iticket } from '../store/tickets/contracts/state'
import { setSortedTickets } from '../store/tickets/actionCreator'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 10,
        },
        CheckIcon: {
            color: '#2196F3',
            padding: '0',
            position: 'absolute',
            top: '7px',
            left: '11px',
            width: '16px',
        },
        icon: {
            borderRadius: 2,
            width: 20,
            height: 20,
            padding: '0px',
            margin: '0px',
            backgroundColor: '#fff',
            border: '1px solid #9ABBCE',
        },
        checkedIcon: {
            border: `1px solid ${theme.palette.primary.main}`,

            '&:before': {
                display: 'block',
                content: '""',
                backgroundPosition: '20% 20%',
            },
        },
        ListPadding: {
            padding: '0 0 0 8px',
        },
        listItem: {
            '&:hover': {
                background: 'rgba(241, 252, 255, 1)',
            },
        },
    }),
)

interface ItransferArr {
    name: string
    checked: boolean
}

interface propsInterface {
    allTickets: Iticket[]
}

export const ListOfCheckBox: React.FC<propsInterface> = React.memo(
    ({ allTickets }: propsInterface): React.ReactElement => {
        const classes = useStyles()
        const [countOfAllButtonCheckbox, setCountOfAllButtonCheckbox] = useState<number>(0)
        const dispatch = useDispatch()
        const allSortedTickets = useSelector(selectSortedTickets)

        let filtredTickets: { current: Iticket[] | [] } = React.useRef([])
        filtredTickets.current = []

        const [transferArr, setTransferArr] = useState<Array<ItransferArr>>([
            {
                name: 'Все',
                checked: true,
            },
            {
                name: 'Без пересадок',
                checked: true,
            },
            {
                name: '1 пересадка',
                checked: true,
            },
            {
                name: '2 пересадки',
                checked: true,
            },
            {
                name: '3 пересадки',
                checked: true,
            },
        ])

        const handleToggle = (checkbox: ItransferArr, value: number) => {
            if (value === 0) {
                setTransferArr(
                    transferArr.map((item, index) => {
                        if (countOfAllButtonCheckbox % 2 === 0) {
                            if (item.checked === true) {
                                item.checked = false
                            }
                        } else {
                            if (item.checked === false) {
                                item.checked = true
                            }
                        }

                        return item
                    }),
                )
                setCountOfAllButtonCheckbox(countOfAllButtonCheckbox + 1)
            } else {
                transferArr[0].checked = false
                setCountOfAllButtonCheckbox(1)

                setTransferArr(
                    transferArr.map((item, index) => {
                        if (index === value) {
                            item.checked = !item.checked
                        }

                        return item
                    }),
                )
            }

            if (value === 0) {
                if (!checkbox.checked) {
                    filtredTickets.current = []
                    dispatch(setSortedTickets([]))
                } else {
                    filtredTickets.current = allTickets
                    dispatch(setSortedTickets([...allTickets]))
                }
            } else {
                if (checkbox.checked) {
                    const filteredTicketsOneSort = allTickets.filter(
                        item => item.segments[0].stops.length === value - 1,
                    )
                    const filteredTicketsTwoSort = allTickets.filter(
                        item => item.segments[1].stops.length === value - 1,
                    )

                    dispatch(
                        setSortedTickets(
                            Array.from(
                                new Set([
                                    ...allSortedTickets,
                                    ...filteredTicketsOneSort,
                                    ...filteredTicketsTwoSort,
                                ]),
                            ),
                        ),
                    )
                } else {
                    const filteredTickets = allSortedTickets
                        .filter(item => item.segments[0]?.stops.length !== value - 1)
                        .filter(item => item.segments[1]?.stops.length !== value - 1)

                    dispatch(setSortedTickets(filteredTickets))
                }
            }
        }

        const transferArMap = transferArr.map((item, index) => {
            const labelId = `checkbox-list-label-${item.name}`

            return (
                <ListItem
                    key={item.name}
                    dense
                    button
                    className={classes.listItem}
                    onClick={() => handleToggle(item, index)}>
                    <ListItemIcon className={classes.ListPadding}>
                        <Checkbox
                            checked={item.checked}
                            edge="start"
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            checkedIcon={
                                <span className={clsx(classes.icon, classes.checkedIcon)}>
                                    <CheckIcon className={classes.CheckIcon} />
                                </span>
                            }
                            icon={<span className={classes.icon} />}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${item.name}`} />
                </ListItem>
            )
        })

        return <List className={classes.root}>{transferArMap}</List>
    },
    (prevProps, nextProps) => {
        if (JSON.stringify(prevProps.allTickets) !== JSON.stringify(nextProps.allTickets)) {
            return false
        } else {
            return true
        }
    },
)
