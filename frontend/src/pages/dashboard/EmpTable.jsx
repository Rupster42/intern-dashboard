import { useState, useEffect } from 'react'
import api from '../../../api'
import debounce from 'lodash.debounce'




const EmpTable = () => {
    const [userData, setUserData] = useState([])
    const [loading, setIsLoading] = useState(true)

    const [nameVal, setNameVal] = useState("")



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get('/api/users')
                console.log(response)
                setUserData(response.data)
            }
            catch (error) {
                console.log('Error fetching details', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserDetails()
    }, [])

    async function handleSubmit(nameVal) {
        try {
            const response = await api.get(`api/users/?search=${nameVal}`)
            console.log(response.data)
            setUserData(response.data)
        } catch (error) {
            console.log('Error occured:', error)
        }

    }

    const debouncedSearch = debounce((value) => {
        handleSubmit(value)
    }, 500)


    const handleSubmitJD = async (value) => {
        try {
            const response = await api.get(`/api/users/?ordering=${value}`);
            setUserData(response.data);
        } catch (error) {
            console.log("Ordering fetch error:", error);
        }
    }



    if (loading) return <p>Loading.......</p>

    return (
        <>
            <input type="text" name="search" placeholder="search users.." onChange={(e) => { setNameVal(e.target.value); debouncedSearch(e.target.value) }} />
            <button onClick={() => { handleSubmit(nameVal) }}>Search</button>

            <br />

            <label>Choose Joining date order:</label>
            <select name="JoinDate" onChange={(e) => handleSubmitJD(e.target.value)}>
                <option value='-date_joined'>Latest</option>
                <option selected value='date_joined'>Oldest</option>
            </select>

            <br />

            <p>Country filter</p>
            <label>Choose country</label>


            <div className="p-4">
                <h2 className="text-xl font bold mb-4">Employee Table</h2>
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Username</th>
                            <th className="border px-4 py-2">Department</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">Date Joined</th>
                            <th className="border px-4 py-2">Is_Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => {
                            console.log(userData)
                            return <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.first_name}</td>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.department ? user.department.name : 'N/A'}</td>
                                <td className="border px-4 py-2">{user.country}</td>
                                <td className="border px-4 py-2">{new Date(user.date_joined).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{user.is_staff ? 'Yes' : 'No'}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmpTable