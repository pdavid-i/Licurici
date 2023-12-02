import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './router/Routes.tsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
