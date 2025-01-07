import { useState } from 'react'
import './App.css'
// import reactLogo from './assets/react.svg'
// import ComponentContent from './ComponentContent'
// import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
