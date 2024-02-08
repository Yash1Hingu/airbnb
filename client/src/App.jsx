import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css'
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import Layout from './components/Layout'
import axios from 'axios'
import { userAction } from './store/user';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const userDoc = useSelector(state => state.user.userDoc);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDoc) {
      axios.get('/profile').then(response => {
        dispatch(userAction.setUserDoc(response.data));
      });
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
