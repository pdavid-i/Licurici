import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../features/Login/Login";
import Homepage from "../layout/Homepage/Homepage";
import Dummy from "../layout/Dummy/Dummy";
import Register from "../features/Register/Register";
import AuthConditionalRoute from "./AuthConditionalRoute";
import CatalogSection from "../features/CatalogSection/CatalogSection";
import ProfileSection from "../features/Profile/ProfileSection";
import FavoritesSection from "../features/FavoritesSection/FavoritesSection";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <AuthConditionalRoute auth={false}/>, children: 
                [
                    {path: '/register', element: <Register />},
                    {path: '/login', element: <Login />},
                ]
            }, 
            {element: <AuthConditionalRoute auth={true}/>, children: 
                [
                    {path: '/erori', element: <Dummy />},
                    {path: '/profile', element: <ProfileSection />},
                    {path: '/favorites', element: <FavoritesSection />},
                    {path: '/catalog', element: <CatalogSection />}
                ]
            }, 
            {path: '', element: <Homepage />},
            {path: '/register', element: <Register />},
        ]
    }
])