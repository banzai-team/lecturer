import './App.css'

import { Router } from "./pages/router";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Router/>
    </HelmetProvider>
  )
}

export default App
