import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";

import {
    listEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    assignEmployeeToTeam,
    unassignEmployeeFromTeam,
    listTeams
} from '../api';
import EmployeeForm from './EmployeeForm';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [teams, setTeams] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false)

    async function load() {
        setLoading(true);
        try {
            const emp = await listEmployees();
            const tm = await listTeams();

            setEmployees(Array.isArray(emp) ? emp : []);
            setTeams(Array.isArray(tm) ? tm : []);
        } catch (err) {
            console.error("LOAD ERROR:", err);
        } finally {
            setLoading(false);
        }
    }

    console.log(employees)

    useEffect(() => { load(); }, []);

    async function onCreate(payload) {
        await createEmployee(payload);
        await load();
        setShowForm(false)
    }

    async function onUpdate(id, payload) {
        await updateEmployee(id, payload);
        setEditing(null);
        await load();
    }

    async function onDelete(id) {
        if (!window.confirm('Delete employee?')) return;
        await deleteEmployee(id);
        await load();
    }

    async function toggleAssign(empId, teamId, assigned) {
        if (assigned) await unassignEmployeeFromTeam(empId, teamId);
        else await assignEmployeeToTeam(empId, teamId);
        await load();
    }

    if (loading) return <div>Loading employees...</div>;

    return (
        <div className=''>
            <div className=' flex gap-40 justify-between px-12 py-4'>
                <h2 className=' text-center text-4xl text-sky-900  font-semibold' >List of Employees </h2>
                <button onClick={() => setShowForm(true)} className='flex items-center gap-2 text-sky-100 text-xl font-semibold bg-sky-900 rounded-xl p-4 cursor-pointer hover:bg-sky-800 '><span><FaPlus /></span> Create Employee</button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-sky-950 px-8 py-6 rounded-xl shadow-lg w-[40%]">
                        <EmployeeForm onSubmit={onCreate} onCancel={() => setShowForm(false)} />
                    </div>
                </div>
            )}
            <div className='flex flex-wrap gap-4 '>
                {employees.map(emp => {
                    const empTeams = emp.Teams || [];

                    return (
                        <div key={emp.id} className='bg-pink-50 p-4 rounded-xl relative z-10' >
                            {/* Fix backend field names */}
                            <div className=''>
                                <p className='text-xl text-sky-900 font-semibold'>{emp.firstName} {emp.lastName}</p>
                                <p className='text-gray-800 font-semibold'>{emp.position || "No position"}</p>
                            </div>

                            <div className='text-gray-80 flex flex-wrap'>
                                Teams: {empTeams.length ? empTeams.map(t => t.name).join(', ') : "—"}
                            </div>

                            <div className='mt-4'>
                                <button onClick={() => { setEditing(emp) }} className='bg-sky-100 px-5 rounded border border-sky-900 mr-2 text-sky-950 font-semibold cursor-pointer'>Edit</button>
                                <button onClick={() => onDelete(emp.id)} className=' px-4 rounded border border-sky-900 text-sky-900 font-semibold cursor-pointer'>Delete</button>
                            </div>

                            <div className=''>
                                <label className='text-xl text-sky-900 font-semibold'><b>Assign / Unassign Teams:</b></label>
                                <div className='flex gap-4 flex-wrap '>
                                    {teams.map(team => {
                                        const assigned = empTeams.some(t => t.id === team.id);

                                        return (
                                            <div className='' key={`${emp.id}-${team.id}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={assigned}
                                                    onChange={() => toggleAssign(emp.id, team.id, assigned)}
                                                />
                                                {" "}
                                                {team.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {editing && editing.id === emp.id && (
                                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-sky-950 px-8 py-6 rounded-xl shadow-lg w-[40%]">
                                        <EmployeeForm
                                            initial={editing}
                                            onSubmit={(payload) => onUpdate(emp.id, payload)}
                                            onCancel={() => setEditing(null)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
