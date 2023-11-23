import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
    //         light: '#757ce8',
            main: '#7653FF',
    //         dark: '#002884',
    //         contrastText: '#fff',
        },
        secondary: {
            // light: '#ff7961',
            main: '#263238',
            // dark: '#ba000d',
            // contrastText: '#000',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: ({
                root: {
                    // backgroundColor: "#263238",
                }
            })
        },
    }
});