import { ReactNode, createContext, useState } from "react"
import { FieldValues } from 'react-hook-form';
import agent from "../api/agent";

interface UserContextProviderProps {
    children: ReactNode
}

interface UserContextType {
    user: any | null;  // Replace UserType with the actual type of your user object
    isAuth: boolean;
    login: (data: FieldValues) => Promise<void>;
    //logout: () => void;  // If you have a logout function
  }
  
const defaultContextValue: UserContextType = {
    user: null,
    isAuth: false,
    login: async () => {},  // Default no-op function
    //logout: () => {}       // If you have a logout function
};

export const UserContext = createContext(defaultContextValue);

export const UserContextProvider = ({children} : UserContextProviderProps) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    //const [newWordsCount, setNewWordsCount] = useState(0);

    const login = async (data: FieldValues) => {
        try {
          const response = await agent.Account.login(data);
          console.log("Booyaa");
          console.log(response);
          if (response.status === 200) {
            setUser(response.user);  // Assuming the response has a user object
            setIsAuth(true);         // Set authentication status to true
          }
        } catch (error) {
          console.error('Login failed:', error);
          // Handle login error (e.g., setting an error state, showing a message)
        }
      };

    return (
        <UserContext.Provider value={{user, isAuth, login}}> {children} </UserContext.Provider>
    )
}