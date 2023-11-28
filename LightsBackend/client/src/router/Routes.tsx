import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../features/Login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Login />},
            {path: '/login', element: <Login />},
            {path: '/register', element: <Login />},
        ]
    }
])