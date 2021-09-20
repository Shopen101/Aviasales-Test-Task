import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnText: {
            width: '100%',
            height: '50px',
            fontSize: '12px',
        },
    }),
)

interface ShowFiveMoreProps {
    onClick: () => void
}

export const ShowFiveMore: React.FC<ShowFiveMoreProps> = ({
    onClick,
}: ShowFiveMoreProps): React.ReactElement => {
    const classes = useStyles()

    return (
        <Button onClick={onClick} className={classes.btnText} variant="contained" color="primary">
            Показать ещё 5 билетов!
        </Button>
    )
}
