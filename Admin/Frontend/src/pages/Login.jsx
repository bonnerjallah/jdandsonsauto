import { useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import axios from 'axios'

import Cookies from 'js-cookie'

import loginstyle from '../style/loginstyle.module.css'

const Login = () => {
    const {login} = useAuth()

    const navigate = useNavigate()
    

    const[loginData, setLoginData] = useState({
        username: '',
        pwd: ''
    })

    const[errorMessage, setErrorMessage] = useState('') // display user error message

    const handleLoginInput = (e) => {
        e.preventDefault()

        const{name, value} = e.target
        setLoginData((prevData) => ({...prevData, [name]: value}))
    }


    axios.defaults.withCredentials = true;
    const handleSubmitData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', loginData, {
                headers: { 'Content-Type': 'application/json'},
            });

            if (response.status === 200) {
                console.log('Logged in successfully');

                // Access token from cookies
                const token = Cookies.get('token');

                // Access the data in the front end
                const { userData } = response.data;

                login(userData, token);

                setLoginData({
                    username: '',
                    pwd: '',
                });

                setErrorMessage('');

                navigate('/Dashboard');

            } else {
                console.log('Error:', response.data.error);
            }
        } catch (error) {       
            console.log('Error logging in:', error);
            setErrorMessage(error.response.data.error);
        }
    };


    return (
        <div className={loginstyle.loginMainContainer}>
            <div>
                <h1>Login</h1>
            </div>
            {errorMessage && (<p className={loginstyle.loginErrorMessage}>{errorMessage}</p>)}

            <div className={loginstyle.loginWrapper}>
                <form onSubmit={handleSubmitData}>
                    <label htmlFor="uname">
                        Username:
                        <input type="text" name='username' id='uname' placeholder='Username' value={loginData.username} onChange={handleLoginInput} />
                    </label>
                    <label htmlFor="pawd">
                        Password:
                        <input type="password" name='pwd' id='pawd' placeholder='Password' value={loginData.pwd} onChange={handleLoginInput} />
                    </label>
                    <button className={loginstyle.bttn}type='submit'>Submit</button>

                    <NavLink to='/SignUp'><h2 className={loginstyle.signup}>SignUp</h2></NavLink>
                </form>


            </div>
        </div>
    )
}

export default Login