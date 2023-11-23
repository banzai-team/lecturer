import {ThemeProvider} from "@mui/material";

import './App.css'
import {Router} from "./pages/router";
import {HelmetProvider} from "react-helmet-async";
import {theme} from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <HelmetProvider>
                <Router/>
            </HelmetProvider>
        </ThemeProvider>
    )
}

export default App
