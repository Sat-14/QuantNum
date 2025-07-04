import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-gray-400 text-white text-3xl rounded shadow-lg m-4 p-2 text-center'>Hello world!!</h1>
    </>
  )
}

export default App
