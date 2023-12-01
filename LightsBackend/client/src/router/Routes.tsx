import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../features/Login/Login";
import Homepage from "../layout/Homepage/Homepage";
import Dummy from "../layout/Dummy/Dummy";
import Register from "../features/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Homepage />},
            {path: '/login', element: <Login />},
            {path: '/register', element: <Register />},
            {path: '/erori', element: <Dummy />}
        ]
    }
])