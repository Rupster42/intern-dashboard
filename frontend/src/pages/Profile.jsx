import { useState, useEffect } from 'react'
import api from '../../api'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [bio, setBio] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [profilePic, setProfilePic] = useState(null)

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get('/api/users/me')
                const data = response.data
                console.log(response.data)
                setUserInfo(data)

                // Initialize input fields
                setUsername(data.username || "")
                setEmail(data.email || "")
                setPhone(data.phone || "")
                setBio(data.bio || "")
                setFirstname(data.first_name || "")
                setLastname(data.last_name || "")
            } catch (error) {
                console.log('Error fetching details', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserDetails()
    }, [])

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("bio", bio)
        formData.append("first_name", firstname)
        formData.append("last_name", lastname)

        if (profilePic) {
            formData.append("profile_pic", profilePic)
        }

        try {
            await api.patch('/api/users/me/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            alert("Profile updated!")
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message)
        }
    }

    if (isLoading) return <div>Loading.........</div>

    return (
        <>
            <h1>My Profile</h1>
            {userInfo.profile_pic && (
                <img src={userInfo.profile_pic} alt="pic" width="150" />
            )}

            <label>Username: </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />

            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />

            <label>Phone number: </label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />

            <label>Profile Bio: </label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            <br />

            <label>First Name: </label>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <br />

            <label>Last Name: </label>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <br />

            <label>Profile Picture: </label>
            <input type="file" onChange={handleFileChange} />
            <br />

            <h3>View-only Information</h3>

            <div><strong>Department:</strong> {userInfo.department.name}</div>
            <div><strong>Country:</strong> {userInfo.country}</div>
            <div><strong>Last Login:</strong> {userInfo.last_login}</div>
            <div><strong>Hit Count:</strong> {userInfo.hit_count}</div>
            <div><strong>Date Joined:</strong> {userInfo.date_joined}</div>
            <div><strong>Admin:</strong> {userInfo.is_admin ? "Yes" : "No"}</div>

            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Profile
