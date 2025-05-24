import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Users/Register'
import Login from './components/Users/Login'
import Dashboard from './components/Users/Dashboard'
import PublicNavbar from './components/Navbar/PublicNavbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home/Home'
// import PrivateNavbar from './components/Navbar/PrivateNavbar'



function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <PublicNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
