import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import Layout from './components/Layout'
import axios from 'axios'
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const userDoc = useSelector(state => state.user.userDoc);

  useEffect(() => {
    if (!userDoc) {
      axios.get('/profile');
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
