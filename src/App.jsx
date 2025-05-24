import {BrowserRouter, Routes, Route} from 'react-router-dom'

const Home = () => {
  return <h1>Hello world</h1>
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
