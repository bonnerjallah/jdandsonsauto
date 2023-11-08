import { createContext, useContext, useState, useEffect} from "react";

import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)

    axios.defaults.withCredentials = true;
    async function refreshAccessToken({ setLoggedIn, setUser }) {
        try {
            const response = await axios.post(
                'http://localhost:3001/refresh_token',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                // Token refresh successful
                const userData = response.data;

                setLoggedIn(true);
                setUser(userData);
            } else {
                // Token verification failed
                console.error('Token verification failed');

                logOut()
            }
        } catch (error) {
            console.log();
            logOut()
        }
    }


    useEffect(() => {
        // Check for a token in local storage when the component mounts (for session persistence)
        const storedToken = window.localStorage.getItem('token');

        if (storedToken) {
            setLoggedIn(true);


            // Set up an interval to refresh the access token
            const refreshAccessTokenInterval = setInterval(() => {
                refreshAccessToken({
                    setToken, // Make sure setToken is accessible here
                    setLoggedIn,
                    setUser,
                });
            }, 50 * 1000);

            // Clear the interval when the component unmounts to prevent memory leaks
            return () => {
                clearInterval(refreshAccessTokenInterval);
            };
        } else {
            // If there's no stored token, initiate the token refresh
            refreshAccessToken({ setToken, setLoggedIn, setUser });
        }


    }, [loggedIn]);


    const login = (userData, token) => {

        setLoggedIn(true);
        setUser(userData);

        window.localStorage.setItem('token', token);

        setToken(token)
    };


    const logOut = () => {
        setLoggedIn(false);
        setUser(null);
        setToken(null)

        // Remove the token from local storage
        window.localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logOut, user, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);



