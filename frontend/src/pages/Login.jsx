import React, { useState } from 'react';
import { login } from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        if (!email || !password) {
            setErr("Email & password are required");
            return;
        }

        setErr(null);
        setLoading(true);

        try {
            const res = await login({ email, password });

            if (res.token) {
                onLogin(res.user, res.token);
                navigate("/")
            } else {
                setErr(res.error || "Login failed");
            }
        } catch (error) {
            console.log(error)
            setErr("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center p-20 '>
            <form onSubmit={submit} className="bg-sky-950 px-8 py-6 rounded-xl shadow-lg w-[40%] mt-6">
                <h2 className='text-center text-4xl text-sky-200 font-semibold p-4 '>Login</h2>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='email' className='text-sky-50 mb-1 text-sm font-serif'>Email</label>
                    <input
                        id='email'
                        type="email"
                        placeholder="Email"
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
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='border border-sky-100 rounded-md px-2 py-1 outline-0 text-white'
                    />
                </div>
                <button type="submit" disabled={loading} className='w-full cursor-pointer bg-sky-200  py-2 rounded text-sky-900 font-semibold mt-6 '>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className='mb-4 text-blue-500 text-sm'>
                    Don't have an account? <Link to="/register" className='underline'>Register Org</Link>
                </p>
                {err && (
                    <div style={{ color: 'red', marginTop: '5px' }}>
                        {err}
                    </div>
                )}
            </form>
        </div>
    );
}

