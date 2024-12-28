import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EmployeeCard } from '../EmployeeCard/index.tsx';
import { useNavigate } from 'react-router-dom';

interface Employee {
    _id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    designation: string;
    email: string;
    contact_number: number;
    salary: number;
    joining_date: string;
    profile?: string;
}

interface FetchEmployeesParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
}

export const PeoplePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    const fetchEmployees = async (params: FetchEmployeesParams = {}) => {
        try {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/employee`,
                params,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data?.status === "Success") {
                const employeeData = response.data.data.employee.map((emp: any) => ({
                    id: emp._id,
                    name: `${emp.first_name} ${emp.middle_name || ''} ${emp.last_name}`.trim(),
                    role: emp.designation,
                    email: emp.email,
                    phone: emp.contact_number.toString(),
                    salary: `₹${emp.salary.toLocaleString()}`,
                    joinedDate: new Date(emp.joining_date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    }),
                    image: emp.profile || '/images/user1.svg'
                }));
                setEmployees(employeeData);
            } else {
                setError('Failed to fetch employees');
            }
        } catch (err) {
            setError('An error occurred while fetching employees');
            console.error('Error fetching employees:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchQuery) {
                fetchEmployees({ search: searchQuery });
            } else {
                fetchEmployees();
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-[#202020] mb-8">
            <div className="ml-[80px]">
                <nav className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 py-2 md:px-6 mb-4 bg-[#1B1B1B]">
                    <div className="flex items-center overflow-x-auto whitespace-nowrap pb-2 md:pb-0 hide-scrollbar">
                        <a href="#" className="text-teal-400 mr-8">People</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300 mr-8">Attendance</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300 mr-8">Timesheets</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300 mr-8">Leaves</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">1-on-1</a>
                    </div>

                    {/* Profile Section */}
                    <div className="relative bg-[#1B1B1B]">
                        <div
                            className="flex items-center space-x-4 bg-[#272727] p-2 rounded-lg cursor-pointer shrink-0"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="flex items-center">
                                <img src="/images/user.svg" alt="Profile" className="w-8 h-8 rounded-full" />
                                <span className="ml-2 text-white">Pradeep Mehta</span>
                                <img
                                    src="/images/arrows.svg"
                                    alt="arrow"
                                    className={`ml-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>
                        </div>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#272727] shadow-lg py-1 z-50">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] transition-colors duration-150"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </nav>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 px-3 md:px-6">
                    <div className="relative flex-1 w-full">
                        <img
                            src="/images/search.svg"
                            alt="Search"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                        <input
                            type="text"
                            placeholder="Search by name or designation"
                            className="w-[40%] max-md:w-full pl-10 pr-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2 flex items-center justify-center space-x-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white">
                            <img src="/images/filter.svg" alt="Filter" className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2 flex items-center justify-center space-x-2 bg-teal-400 text-gray-900 rounded-lg shadow-lg transform transition-transform hover:-translate-y-0.5 relative overflow-hidden"
                            style={{
                                boxShadow: '0 4px 0 rgb(13 148 136)',
                            }}>
                            <div className="flex items-center space-x-2 relative z-10">
                                <img src="/images/add.svg" alt="Add" className="w-4 h-4" />
                                <span className="font-medium">Add New</span>
                            </div>
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-5 transition-opacity" />
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-8 px-3 md:px-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-red-500 text-center py-4 px-3 md:px-6">
                        {error}
                    </div>
                )}

                {/* Employee Cards Grid - Updated for better mobile layout */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3 md:px-6">
                        {employees.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                name={employee.name}
                                role={employee.role}
                                email={employee.email}
                                phone={employee.phone}
                                salary={employee.salary}
                                joinedDate={employee.joinedDate}
                                image={employee.profile}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};