import { useState, useEffect } from 'react'
import api from '../../../api'
import { Card } from "flowbite-react";

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';

import moment from "moment"; //for formatting date

const Teams = () => {
    const [departmentData, setDepartmentData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDepartmentDetails = async () => {
            try {
                const response = await api.get('/api/teams')
                console.log(response.data)
                setDepartmentData(response.data)
            }
            catch (error) {
                console.log("Error fetching department details", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchDepartmentDetails()
    }, [])

    if (isLoading) return <div>Loading........</div>

    const joinTrend = departmentData.charts_data.employee_join_trend.map((item) => ({
        name: moment(item.month).format("MMM YYYY"),
        count: item.count,
    }));

    const hitCount = departmentData.charts_data.user_hit_counts.map((item) => ({
        name: item.username,
        totalVisits: item.hit_count
    }));

    const salaryDepartment = departmentData.charts_data.department_salary_expenditure.map((item) => ({
        name: item.department__name,
        spendings: item.expenditure
    }))

    const countryInfo = departmentData.charts_data.country_counts.map((item) => ({
        name: item.country,
        value: item.count
    }))

    const deptInfo = departmentData.charts_data.department_counts.map((item) => ({
        name: item.department__name,
        value: item.count
    }))

    const COLORS = [
        "#8884d8",
        "#82ca9d",
        "#ffc658",
        "#ff8042",
        "#a4de6c",
        "#d0ed57",
        "#8dd1e1",
    ];

    return (
        <>
            <div>Teams</div>
            <Card href="#" className="max-w-sm mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Total Employees
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {departmentData.card_data.total_employees}
                </p>
            </Card>
            <Card href="#" className="max-w-sm mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Total Departments
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {departmentData.card_data.total_departments}
                </p>
            </Card>
            <Card href="#" className="max-w-sm mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Total Salary Expenditure
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {departmentData.card_data.total_salary_expenditure}
                </p>
            </Card>

            <div>
                <div className="text-3xl font-semibold mt-10 mb-5">Employee Join Trend</div>
                <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={joinTrend}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#4f46e5"
                                strokeWidth={3}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <div className="text-3xl font-semibold mt-10 mb-5">Employee Hit Count</div>
                <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={hitCount}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="totalVisits"
                                name="Total Visits"
                                fill="#4f46e5"
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <div className="text-3xl font-semibold mt-10 mb-5">Department Wise Salary</div>
                <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={salaryDepartment}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="spendings"
                                name="Expenditure"
                                fill="#4f46e5"
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="w-full h-[400px]">
                <div className="text-2xl font-semibold mb-4">Employees by Country</div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={countryInfo}
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label
                        >
                            {countryInfo.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full h-[400px]">
                <div className="text-2xl font-semibold mb-4">Employees by Department</div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={deptInfo}
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label
                        >
                            {deptInfo.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>

    )

}

export default Teams