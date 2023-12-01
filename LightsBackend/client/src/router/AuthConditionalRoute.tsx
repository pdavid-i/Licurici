import { Navigate, Outlet, useLocation } from "react-router-dom"

interface AuthConditionalRouteProps {
    auth: boolean;
  }

function AuthConditionalRoute({auth}: AuthConditionalRouteProps) {
    // not bullet proof, i know
    const loggedIn = !!localStorage.getItem("jwt")
    const location = useLocation();
    
    // cheeky, i like it
    if (auth === loggedIn) {
        return <Outlet></Outlet>
    }

    // I'll send em to profile once that is done
    return <Navigate to='/'/>;
}

export default AuthConditionalRoute
