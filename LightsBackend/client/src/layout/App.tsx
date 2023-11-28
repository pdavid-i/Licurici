import './App.css'
import Navbar from './Navbar/Navbar'
import { useState } from 'react';
import Homepage from './Homepage/Homepage';
import { Outlet } from 'react-router-dom';

function App() {

    return (
    <>
      <Navbar />
      <div className="hero">
        <Outlet />
      </div>
    </>
  )
}

export default App
