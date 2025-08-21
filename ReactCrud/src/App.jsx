import { useState } from 'react'

import './App.css'

import {  BrowserRouter as Router,  Routes,  Route} from 'react-router-dom'
import { Usuarios } from './pages/Usuarios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/list-usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
    </>
  )
}

export default App




