import React from 'react'
import logo from '../assets/logo.svg'
import { Box } from '@material-ui/core'

export const LogoAviasales: React.FC = React.memo((): React.ReactElement => {
    return (
        <Box mt={3}>
            <img src={logo} alt="logo Aviasales" />
        </Box>
    )
})
