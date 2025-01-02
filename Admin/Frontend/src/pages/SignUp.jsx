import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import loginstyle from '../style/loginstyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const SignUp = () => {

    const [signUpInput, setSignUpInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        Pwd: ''
    })

    const [errorMessage, setErrorMessage] = useState() // to display to user error message

    
    const handleSignUpInput = (e) => {
        const {name, value} = e.target
    
        setSignUpInput((prevData) =>({...prevData, [name]: value}))
    }
    
    const handleInputSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post(`${backendUrl}/createadminuser`, signUpInput, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (res.status === 201) {  // Check for successful creation
                console.log("User created successfully");
    
                setSignUpInput({
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    Pwd: '',
                });
    
                setErrorMessage(''); // Clear any previous error message
            } else {
                // Backend returns error as JSON, so handle it properly
                const errorData = res.data;
                console.log('Error:', errorData);
    
                if (errorData && errorData.error) {
                    setErrorMessage(errorData.error); // Set error message
                } else {
                    console.log("An unknown error occurred");
                }
            }
        } catch (error) {
            console.log("Error creating User:", error);
        }
    };
    

    return (
        <div className={loginstyle.signUpMainContainer}>
            <div>
                <h1>SignUp</h1>
            </div>
            <div className={loginstyle.signUpWrapper}>
                <form onSubmit={handleInputSubmit}>
                    <label htmlFor="userFirstName">
                        First Name:
                        <input type="text" name='firstName' id='userFirstName' placeholder='First Name' value={signUpInput.firstName} onChange={handleSignUpInput} />
                    </label>
                    <label htmlFor="userLastName">
                        Last Name:
                        <input type="text" name='lastName' id='userLastName' placeholder='Last Name' value={signUpInput.lastName} onChange={handleSignUpInput} />
                    </label>
                    <label htmlFor="userEmail">
                        Email:  
                        <input type="email" name="email" id='userEmail' placeholder='Email' value={signUpInput.email} onChange={handleSignUpInput} />
                    </label>
                    <label htmlFor="userUserName">
                        Username:
                        <input type="text" name="username" id='userUserName' placeholder='Username' value={signUpInput.username} onChange={handleSignUpInput} />
                    </label>
                    <label htmlFor="UserPwd">
                        Password:
                        <input type="password" name="Pwd" id='UserPwd' placeholder='Password' value={signUpInput.Pwd} onChange={handleSignUpInput} />
                    </label>
                    <button className={loginstyle.bttn2} type='submit'>Submit</button>

                    <NavLink to='/Login'><h2 className={loginstyle.login}>Login</h2></NavLink>
                </form>

                {errorMessage && (<p className={loginstyle.errorMessage}>{errorMessage}</p>)}

            </div>
        </div>
    )
}

export default SignUp