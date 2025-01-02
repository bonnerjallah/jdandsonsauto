import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";



const backendUrl = import.meta.env.VITE_BACKEND_URL;


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


    axios.defaults.withCredentials = true;
    const refreshAccessToken = async (authcontext) => {

        if(!authcontext) return

        const {setLoggedIn, setUser, logOut} = authcontext

        try {
            const response = await axios.post(`${backendUrl}/refreshadmintoken`, {}, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                const userData = response.data;

                setLoggedIn(true);
                setUser(userData);
            } else {
                console.error("Token validation failed", response.status);
                logOut();
            }
        } catch (error) {
            console.log("Error refreshing access token", error);
            logOut();
        }
    }


    useEffect(() => {
         
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getadminmember`);

                if (response.status === 200 && response.data.valid) {
                    setLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setLoggedIn(false);
                    setUser(null)
                    console.error("Invalid user session");
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setLoggedIn(false);
                    setUser(null);
                } else {
                    console.error("Error validating on page load", error);
                }
            }
        }

        checkAuthStatus();

        const refreshAccessTokenInterval = setInterval(refreshAccessToken, 50 * 1000);

        return () => clearInterval(refreshAccessTokenInterval);

    }, []);


    const login = (userData, token) => {
        setLoggedIn(true);
        setUser(userData);
    };


    const logOut = () => {
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}




