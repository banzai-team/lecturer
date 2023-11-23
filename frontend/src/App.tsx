import {useState} from 'react'
import './App.css'

import {Router} from "./pages/router";
import {HelmetProvider} from "react-helmet-async";

function App() {
  const [count, setCount] = useState(0)

  return (
      <HelmetProvider>
          <Router/>
      </HelmetProvider>
  )
}

export default App
