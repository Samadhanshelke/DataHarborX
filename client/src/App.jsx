
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Page/HomePage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import {Toaster} from 'react-hot-toast';
import PrivateRoute from './Auth/PrivateRoute'
import VerifyEmail from './Page/VerifyEmail'
import ForgotPassword from './Page/ForgotPassword'
import RessetPassword from './Page/RessetPassword'
import DashBoard from './Page/DashBoard'
import CreateUser from './Page/CreateUser'
import UpdateUser from './Page/UpdateUser'
function App() {


  return (
    <>
      <BrowserRouter>
       <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
           
            <Route path='/verify-email' element={
              <PrivateRoute>
                  <VerifyEmail/>
              </PrivateRoute>
            }/>
            <Route path='/reset-password' element={
               <PrivateRoute>
                   <ForgotPassword/>
               </PrivateRoute>
            }/>
            <Route path='/reset-password/:id' element={
               <PrivateRoute>
                     <RessetPassword/>
               </PrivateRoute>
            }/>
            <Route path='/dashboard' element={
               <PrivateRoute>
                   <DashBoard/>
               </PrivateRoute>
            }/>
            <Route path='/createUser' element={
                  <PrivateRoute>
                       <CreateUser/>

                  </PrivateRoute>
            }/>
            <Route path='/edituser/:id' element={
               <PrivateRoute>

                     <UpdateUser/>
               </PrivateRoute>
            }/>  

        </Routes>
      </BrowserRouter>
     <Toaster/>
    </>
  )
}

export default App
