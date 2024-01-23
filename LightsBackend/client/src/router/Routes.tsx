import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../features/UnauthenticatedAccount/Login/Login";
import Homepage from "../layout/Homepage/Homepage";
import Dummy from "../layout/Dummy/Dummy";
import Register from "../features/UnauthenticatedAccount/Register/Register";
import AuthConditionalRoute from "./AuthConditionalRoute";
import CatalogSection from "../features/CatalogSection/CatalogSection";
import ProfileSection from "../features/Profile/ProfileSection";
import FavoritesSection from "../features/FavoritesSection/FavoritesSection";
import ForgotPassword from "../features/UnauthenticatedAccount/ForgotPassword/ForgotPassword";
import ResetPassword from "../features/UnauthenticatedAccount/ResetPassword/ResetPassword";
import NewPage from "../features/NewPage/NewPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <AuthConditionalRoute auth={false}/>, children: 
                [
                    {path: '/register', element: <Register />},
                    {path: '/login', element: <Login />},
                    {path: '/forgot-password/', element: <ForgotPassword />},
                    {path: '/reset-password/:token', element: <ResetPassword />}
                ]
            }, 
            {element: <AuthConditionalRoute auth={true}/>, children: 
                [
                    {path: '/erori', element: <Dummy />},
                    {path: '/profile', element: <ProfileSection />},
                    {path: '/favorites', element: <div className="hero" id="new-hero"><FavoritesSection /></div>},
                    {path: '/catalog', element: <div className="hero" id="new-hero"><CatalogSection /></div>},
                    {path: '/new', element: <NewPage />}
                ]
            }, 
            {path: '', element: <NewPage />},
            {path: '/game', element: <div className="hero"><Homepage /></div>},
            {path: '/register', element: <Register />},
        ]
    }
])