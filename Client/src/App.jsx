import { useState } from 'react'
import Routing from "./Routing"
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
        <Routing/>
        <div><Toaster/></div>
    </>
  )
}

export default App
