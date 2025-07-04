import { useState, useEffect } from 'react'
import api from '../../../api'
import debounce from 'lodash.debounce'

const EmpTable = () => {
    const [userData, setUserData] = useState([])
    const [loading, setIsLoading] = useState(true)

    const [nameVal, setNameVal] = useState("")
    const [countryOptions, setCountryOptions] = useState([])
    const [deptOptions, setDeptOptions] = useState([])

    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedDept, setSelectedDept] = useState('')
    const [orderVal, setOrderVal] = useState('date_joined')

    useEffect(() => {
        fetchUserDetails()
        fetchCountryOptions()
        fetchDeptOptions()
    }, [])

    const fetchUserDetails = async (filters = {}) => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams(filters).toString()
            const response = await api.get(`/api/users/?${params}`)
            setUserData(response.data)
        } catch (error) {
            console.log('Error fetching user details', error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCountryOptions = async () => {
        try {
            const response = await api.get('/api/countries/options/')
            setCountryOptions(response.data)
        } catch (err) {
            console.log('Failed to fetch country options')
        }
    }

    const fetchDeptOptions = async () => {
        try {
            const response = await api.get('/api/departments/options/')
            setDeptOptions(response.data)
        } catch (err) {
            console.log('Failed to fetch department options')
        }
    }

    const handleSearchChange = debounce((value) => {
        setNameVal(value)
        applyFilters({ search: value })
    }, 500)

    const applyFilters = (extra = {}) => {
        const filters = {
            ...(nameVal && { search: nameVal }),
            ...(selectedCountry && { country: selectedCountry }),
            ...(selectedDept && { department: selectedDept }),
            ...(orderVal && { ordering: orderVal }),
            ...extra
        }
        fetchUserDetails(filters)
    }

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value)
        applyFilters({ country: e.target.value })
    }

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value)
        applyFilters({ department: e.target.value })
    }

    const handleOrderChange = (e) => {
        setOrderVal(e.target.value)
        applyFilters({ ordering: e.target.value })
    }

    if (loading) return <p>Loading.......</p>

    return (
        <>
            <input
                type="text"
                name="search"
                placeholder="Search users..."
                onChange={(e) => handleSearchChange(e.target.value)}
            />

            <br /><br />

            <label>Sort by Joining Date:</label>
            <select name="JoinDate" onChange={handleOrderChange} value={orderVal}>
                <option value="-date_joined">Latest</option>
                <option value="date_joined">Oldest</option>
            </select>

            <br /><br />

            <label>Filter by Country:</label>
            <select onChange={handleCountryChange} value={selectedCountry}>
                <option value="">All Countries</option>
                {countryOptions.map((c, index) => (
                    <option key={index} value={c}>{c}</option>
                ))}
            </select>

            <br /><br />

            <label>Filter by Department:</label>
            <select onChange={handleDeptChange} value={selectedDept}>
                <option value="">All Departments</option>
                {deptOptions.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
            </select>

            <br /><br />

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
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.first_name}</td>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.department ? user.department.name : 'N/A'}</td>
                                <td className="border px-4 py-2">{user.country}</td>
                                <td className="border px-4 py-2">{new Date(user.date_joined).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{user.is_staff ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmpTable
