import React, { useState, useEffect } from 'react';

export default function EmployeeForm({ onSubmit, initial = null, onCancel }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [phone, setPhone] = useState('');

    // Load initial values whenever editing starts
    useEffect(() => {
        if (initial) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFirstName(initial.firstName || '');
            setLastName(initial.lastName || '');
            setEmail(initial.email || '');
            setPosition(initial.position || '');
            setPhone(initial.phone || '');
        }
    }, [initial]);

    async function submit(e) {
        e.preventDefault();

        await onSubmit({ firstName, lastName, email, position, phone });

        // Clear only when creating a new employee
        if (!initial) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPosition('');
            setPhone('');
        }
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: 20 }} className='flex flex-col gap-4'>
            <h2 className='text-center text-2xl text-sky-200 font-semibold p-4 '>Add Employee</h2>
            <div className='flex flex-col'><label className='text-sky-50 mb-1 text-sm font-serif' htmlFor='firstName'>First Name</label>
                <input required placeholder="Enter First name" value={firstName} id='firstName' onChange={e => setFirstName(e.target.value)} className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white' />
            </div>
            <div className='flex flex-col'><label className='text-sky-50 mb-1  text-sm font-serif' htmlFor='lastName'>Last Name</label>
                <input required placeholder="Enter last name" value={lastName} id='lastName' onChange={e => setLastName(e.target.value)} className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white' />
            </div>
            <div className='flex flex-col'><label className='text-sky-50 mb-1  text-sm font-serif' htmlFor='email'>Email</label>
                <input required placeholder="Enter Email" value={email} id='email' onChange={e => setEmail(e.target.value)} className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white' />
            </div>
            <div className='flex flex-col'><label className='text-sky-50 mb-1  text-sm font-serif' htmlFor='position'>Position</label>
                <input required placeholder="Enter Position" value={position} id='position' onChange={e => setPosition(e.target.value)} className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white' />
            </div>
            <div className='flex flex-col'><label className='text-sky-50 mb-1  text-sm font-serif' htmlFor='Phone'>Phone</label>
                <input required placeholder="Enter Phone" id='Phone' value={phone} onChange={e => setPhone(e.target.value)} className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white' />
            </div>
            <div className='flex justify-between gap-2 mt-4'>
                <button type="submit" className='w-[50%] bg-sky-200  py-2 rounded text-sky-900 font-semibold'>{initial ? 'UPDATE' : 'CREATE'}</button>
                <button className='cursor-pointer w-[50%] bg-transparant  py-2 rounded text-sky-200 border border-sky-200 font-semibold' type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}


