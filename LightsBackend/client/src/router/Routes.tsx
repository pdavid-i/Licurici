import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../features/UnauthenticatedAccount/Login/Login";
import Homepage from "../layout/Homepage/Homepage";
import Dummy from "../layout/Dummy/Dummy";
import Register from "../features/UnauthenticatedAccount/Register/Register";
import AuthConditionalRoute from "./AuthConditionalRoute";
import CatalogSection from "../features/CatalogSection/CatalogSection";
import ProfileSection from "../features/Profile/ProfileSection";
import ForgotPassword from "../features/UnauthenticatedAccount/ForgotPassword/ForgotPassword";
import ResetPassword from "../features/UnauthenticatedAccount/ResetPassword/ResetPassword";
import LandingPage from "../features/LandingPage/LandingPage";
import PuzzleSection from "../features/PuzzleSection/PuzzleSection";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <AuthConditionalRoute auth={false}/>, children: 
                [
                    {path: '/register', element: <div className="hero"><Register /></div>},
                    {path: '/login', element: <div className="hero"><Login /></div>},
                    {path: '/forgot-password/', element: <div className="hero"><ForgotPassword /></div>},
                    {path: '/reset-password/:token', element: <div className="hero"><ResetPassword /></div>}
                ]
            }, 
            {element: <AuthConditionalRoute auth={true}/>, children: 
                [
                    {path: '/erori', element: <Dummy />},
                    {path: '/profile', element:  <div className="hero" id="profile-hero"><ProfileSection /></div>},
                    {path: '/catalog', element: <div className="hero" id="list-hero"><CatalogSection /></div>},
                    {path: '/piese', element: <div className="hero" id="list-hero"><PuzzleSection /></div>}
                ]
            }, 
            {path: '', element: <LandingPage />},
            {path: '/game', element: <div className="hero"><Homepage /></div>},
        ]
    }
])