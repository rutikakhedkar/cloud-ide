import { useState } from 'react'

import './App.css'
import { CloudIDE } from './components/cloud-ide'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <CloudIDE/>
    </>
  )
}

export default App
