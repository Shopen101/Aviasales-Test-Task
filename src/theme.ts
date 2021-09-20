import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
        },
        secondary: {
            main: '#4A4A4A',
        },
        background: {
            default: '#F3F7FA',
        },
    },
    typography: {
        subtitle1: {
            color: '#4A4A4A',
            fontSize: '1rem',
        },
        subtitle2: {
            color: '#A0B0B9',
            fontSize: '1rem',
        },
    },
    overrides: {
        MuiListItemIcon: {
            root: {
                minWidth: 'auto',
            },
        },
        MuiTab: {
            wrapper: {
                fontSize: '12px',
            }
        },
        
    },
    
})
