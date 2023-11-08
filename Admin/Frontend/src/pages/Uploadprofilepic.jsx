import { useState } from "react"
import { useAuth } from "../components/AuthContext"

import axios from "axios"



const Uploadprofilepic = () => {

    const {user} = useAuth()

    // console.log('user info', user)

    const[profilePic, setProfilePic] = useState()

    const handleImageChange = (e) => {
        setProfilePic(e.target.files[0])
    }
    
    const handleImageSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        if (profilePic) {
            formData.append('image', profilePic, profilePic.name);
        }
    
        // Include user data in the formData
        if (user) {
            console.log("Appending user data",user)

            formData.append('userId', user.id);
            formData.append('userName', user.firstName);
        }
    

    
        try {
            const res = await axios.put('http://localhost:3001/profilepic', formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            });
    
            if (res.status === 200) {
                console.log('Inserting profile pic successful');
            } else {
                console.log('Error inserting profile pic:', res.data);
            }
        } catch (error) {
            console.log("Error inserting profile pic", error);
        }
    }
    

    return (
        <div>
            <h1>Upload Profile Pic</h1>
            <form onSubmit={handleImageSubmit} encType="multipart/form-data" method="POST">
                <input type="file" name='profilepic' accept="image/*" onChange={handleImageChange} />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Uploadprofilepic