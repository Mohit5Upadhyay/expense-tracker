
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/UserContext'

import  {Toaster} from 'react-hot-toast'

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expenses' element={<Expense />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontsize: '13px'
          },
        }} 
      />

    </UserProvider>
  )
}

export default App

const Root = () => {
  // check if token exist in local storgae
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  )
}
