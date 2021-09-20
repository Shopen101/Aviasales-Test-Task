import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Paper, Typography } from '@material-ui/core'
import { formatter } from '../utils/formatPrice'
import { getRandomNum } from '../utils/getRandomNum'
import {
    formatDurationToHoursAndMinutes,
    formatDateToHoursAndMinutes,
    formatOfFinishTime,
} from '../utils/formateDate'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2.5),
            paddingTop: '30px',
            color: theme.palette.text.secondary,
            boxShadow: '-1px 1px 6px 1px #D5D5D5',
            borderRadius: 5,
            display: 'flex',
            flexFlow: 'column wrap',
            marginBottom: '20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '25px',
        },
        price: {
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            color: theme.palette.primary.main,
        },
        wayText: {
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '18px',
            letterSpacing: '0.5px',
            marginBottom: '2px',
            color: '#A0B0B9',
        },
        timeText: {
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '21px',
            color: theme.palette.secondary.main,
        },
        infoBlock: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        infoBlockData: {
            width: '110px'
        }
    }),
)


interface Isegment {
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
}

interface TicketProps {
    price: number
    segments: Isegment[]
}

export const Ticket: React.FC<TicketProps> = ({
    price,
    segments,
}: TicketProps): React.ReactElement => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <div className={classes.header}>
                <div>
                    <Typography className={classes.price}>{formatter.format(price)} Р</Typography>
                </div>
                <div>
                    <img
                        src={`//pics.avs.io/99/36/${getRandomNum(1, 9)}.png`}
                        alt="avia company logo"
                    />
                </div>
            </div>
            <div>
                {segments.map((segment, index) => (
                    <Box
                        key={`${new Date(
                            segment.duration,
                        )}__${new Date().toString()}___${getRandomNum(0, 1000)}__${index}`}
                        mb={2}
                        className={classes.infoBlock}>
                        <div className={classes.infoBlockData}>
                            <Typography className={classes.wayText}>
                                {segment.origin} - {segment.destination}
                            </Typography>
                            <Typography className={classes.timeText}>
                                {formatDateToHoursAndMinutes(segment.date)} -{' '}
                                {formatOfFinishTime(segment.date, segment.duration)}
                            </Typography>
                        </div>
                        <div className={classes.infoBlockData}>
                            <Typography className={classes.wayText}>В ПУТИ</Typography>
                            <Typography className={classes.timeText}>
                                {formatDurationToHoursAndMinutes(segment?.duration)}
                            </Typography>
                        </div>
                        <div className={classes.infoBlockData}>
                            <Typography className={classes.wayText}>
                                {Number(segment.stops?.length) > 1
                                    ? `${segment.stops?.length} ПЕРЕСАДКИ`
                                    : Number(segment.stops?.length) < 1
                                    ? 'БЕЗ ПЕРЕСАДОК'
                                    : `${segment.stops?.length} ПЕРЕСАДКА`}
                            </Typography>
                            <Typography className={classes.timeText}>
                                {segment.stops?.join(', ')}
                            </Typography>
                        </div>
                    </Box>
                ))}
            </div>
        </Paper>
    )
}
