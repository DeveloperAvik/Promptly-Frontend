import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Users/Register'
import Login from './components/Users/Login'

const Home = () => {
  return <h1>Hello world</h1>
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
