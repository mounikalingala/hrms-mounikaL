import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterOrg() {
    const [orgName, setOrgName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        if (!orgName || !email || !password) {
            alert("Organisation name, email & password are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orgName, name, email, password })
            });

            let res = null;

            try {
                res = await response.json();
            } catch {
                res = { error: 'Invalid response from server' };
            }

            if (response.ok && res.token) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                alert(res.error || 'Registration failed');
            }

        } catch (error) {
            console.error("Register error:", error);
            alert("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center  '>
            <form onSubmit={submit} className="bg-sky-950 px-8 py-6 rounded-xl shadow-lg w-[40%] mt-6">
                <h2 className='text-center text-4xl text-sky-200 font-semibold p-4 '>Register</h2>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='orgName' className='text-sky-50 mb-1 text-sm font-serif'>Organisation name</label>
                    <input
                        id='orgName'
                        placeholder="Enter Organisation name" value={orgName} onChange={e => setOrgName(e.target.value)}
                        className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white'
                    />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='name' className='text-sky-50 mb-1 text-sm font-serif'>Name</label>
                    <input
                        id='name'
                        placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)}
                        className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white'
                    />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='email' className='text-sky-50 mb-1 text-sm font-serif'>Email</label>
                    <input
                        id='email'
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className=' text-sky-50 mb-1 text-sm font-serif'>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white'
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className='w-full bg-sky-200  py-2 rounded text-sky-900 font-semibold mt-6 cursor-pointer'>
                    {loading ? "Creating..." : "Create Organisation"}</button>
                <p className='mb-4 text-blue-500 text-sm '>
                    Already have an account? <a href="/login" className='underline'>Login</a>
                </p>
            </form>
        </div>
    );
}



