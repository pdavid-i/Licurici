import { ToastContainer } from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from '../helpers/UserContextProvider';
import { ModalContextProvider } from '../helpers/ModalContextProvider';

function App() {
    return (
    <UserContextProvider>
      <ModalContextProvider>
        <Navbar />
        <ToastContainer className="toaster-messages" position="bottom-right" hideProgressBar theme="colored"/>
        <div className="hero">
          <Outlet />
        </div>
      </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
