import { ReactNode, createContext, useEffect, useState } from "react"
import { FieldValues } from 'react-hook-form';
import agent from "../api/agent";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

interface UserContextProviderProps {
    children: ReactNode
}

interface UserDTO {
  email: string,
  token: string
}

interface UserContextType {
    user: UserDTO | null;  // Replace UserType with the actual type of your user object
    isAuth: boolean;
    login: (data: FieldValues) => Promise<boolean | undefined>;
    logout: () => void;  
  }
  
const defaultContextValue: UserContextType = {
    user: null,
    isAuth: false,
    login:  async () => false,  // Default no-op function
    logout: () => {}
};

const refreshUser = async () => {
    if (localStorage.getItem("jwt") === null)
      return null;

    let user = null;
    try {
     user = await agent.Account.currentUser();
    } catch (err) {
      console.log('JWT Token Refresh error.');
    }
    if (!user)
    {
      toast.error("Your session has expired. Please log in again.");
      localStorage.removeItem("jwt");
      router.navigate('/login');
      return null;
    }
    return user;
}

export const UserContext = createContext(defaultContextValue);

export const UserContextProvider = ({children} : UserContextProviderProps) => {

    const [user, setUser] = useState<UserDTO | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    //const [newWordsCount, setNewWordsCount] = useState(0);

    useEffect(() => {
      // Call refreshUser and update the state accordingly
      const initializeUser = async () => {
        const refreshedUser = await refreshUser();
        setUser(refreshedUser);
        setIsAuth(!!refreshedUser);
      };
  
      initializeUser();
    }, []);

    const login = async (data: FieldValues) => {
        try {
          const response = await agent.Account.login(data);

          if (response.token) {
            console.log(response);
            console.log("Ok set now the user to this tf");
            setUser(response);  // Assuming the response has a user object
            setIsAuth(true);         // Set authentication status to true
            localStorage.setItem('jwt', response.token);
            return true;
          }
        } catch (error) {
          console.error('Login failed:', error);
          return false;
          // Handle login error (e.g., setting an error state, showing a message)
        }
      };

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        setIsAuth(false);
    };

    return (
        <UserContext.Provider value={{user, isAuth, login, logout}}> {children} </UserContext.Provider>
    )
}