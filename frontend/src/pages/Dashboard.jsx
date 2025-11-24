import React from 'react';
import EmployeeList from '../components/EmployeeList';
import TeamList from '../components/TeamList';
import { IoPerson } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import { listEmployees, listTeams } from '../api';

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [Teams, setTeams] = useState([]);

    useEffect(() => {
        const loadEmployees = async () => {
            const emp = await listEmployees();
            setEmployees(Array.isArray(emp) ? emp : []);
        };
        const loadTeams = async () => {
            const team = await listTeams();
            setTeams(Array.isArray(team) ? team : []);

        }
        loadEmployees();
        loadTeams();
    }, []);
    return (
        <div >
            <div className='flex gap-6'>
                <div className='bg-sky-200 w-40 h-40 text-xl font-semibold text-sky-900 rounded-xl p-4'>
                    <h2 className='flex'>Total <br /> Employees <span><GoPerson size={25} /></span></h2>
                    <h1 className='text-sky-950 text-center mt-4 text-5xl'>{employees.length}</h1>
                </div>
                <div className='bg-sky-200 w-40 h-40 text-xl font-semibold text-sky-900 rounded-xl p-4'>
                    <h2 className='flex'>Total <br /> Teams <span><AiOutlineTeam size={25} /></span></h2>
                    <h1 className='text-sky-950 text-center mt-4 text-5xl'>{Teams.length}</h1>
                </div>
                <div className='bg-sky-200 w-40 h-40 text-xl font-semibold text-sky-900 rounded-xl p-4'>
                    <h2 className='flex'>Number of <br /> Assignments <span><MdOutlineAssignment size={25} /></span></h2>
                    <h1 className='text-sky-950 text-center mt-4 text-5xl'>12</h1>
                </div>
            </div>
        </div>
    );
}


