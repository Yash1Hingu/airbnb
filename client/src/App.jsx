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
import { uiActions } from './store/ui';
import AccountPage from './components/pages/AccountPage';
import PlacesPage from './components/pages/PlacesPage';
import PlacePage from './components/pages/PlacePage';
import BookingPage from './components/pages/BookingPage';
import AccountLayout from './components/AccountLayout';
import ProfilePage from './components/pages/ProfilePage';
import BookingsPage from './components/pages/BookingsPage';

axios.defaults.baseURL = 'https://airbnbapi-xyms.onrender.com';
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const userDoc = useSelector(state => state.user.userDoc);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDoc) {
      axios.get('/profile').then(response => {
        dispatch(userAction.setUserDoc(response.data));
        dispatch(uiActions.setIsReady());
      });
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account' element={<AccountLayout />} >
          <Route index element={<ProfilePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/:action' element={<PlacesPage />} />
          <Route path='/account/places/:action/:id' element={<PlacesPage />} />
        </Route>
        <Route path='/account/bookings/:id' element={<BookingPage />} />
        <Route path='/place/:id' element={<PlacePage />} />
      </Route>
    </Routes>
  )
}

export default App
