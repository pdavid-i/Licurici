import { Navigate, Outlet } from "react-router-dom"

interface AuthConditionalRouteProps {
    auth: boolean;
  }

function AuthConditionalRoute({auth}: AuthConditionalRouteProps) {
    // not bullet proof, i know
    const loggedIn = !!localStorage.getItem("jwt")
    
    // cheeky, i like it
    if (auth === loggedIn) {
        return <Outlet></Outlet>
    }

    // I'll send em to profile once that is done
    return <Navigate to='/profile'/>;
}

export default AuthConditionalRoute
