import { ToastContainer } from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from '../helpers/UserContextProvider';

function App() {
    return (
    <UserContextProvider>
      <Navbar />
      <ToastContainer className="toaster-messages" position="bottom-right" hideProgressBar theme="colored"/>
      <div className="hero">
        <Outlet />
      </div>
    </UserContextProvider>
  )
}

export default App
