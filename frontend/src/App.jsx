import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import RegisterOrg from './pages/RegisterOrg';
import Dashboard from './pages/Dashboard';
import { IoPerson } from "react-icons/io5";
import EmployeeList from './components/EmployeeList';
import TeamList from './components/TeamList';
import Home from './pages/Home';
import { AiOutlineTeam } from 'react-icons/ai';
import { RiTeamLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  const onLogout = () => { localStorage.removeItem('user'); localStorage.removeItem('token'); setUser(null); }

  async function handleLogout() {
    try {
      const token = localStorage.getItem('token');

      await fetch(
        `${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/auth/logout`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      // Clear local data ALWAYS
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = '/login';
      onLogout();
    }
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={(u, token) => { localStorage.setItem('user', JSON.stringify(u)); localStorage.setItem('token', token); setUser(u); }} />} />
        <Route path="/register" element={<RegisterOrg onRegister={(u, token) => { localStorage.setItem('user', JSON.stringify(u)); localStorage.setItem('token', token); setUser(u); }} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className='px-4 py-6'>
      <header className='flex justify-between items-center bg-sky-100 px-12 py-4 rounded-xl '>
        <Link to="/" className='text-sky-900 text-3xl font-bold'>HRMS </Link>
        <div className='flex justify-center items-center gap-2' >
          <div className='bg-gray-100 rounded-full p-2 mt-2'>
            <IoPerson className='text-gray-400' size={18} />
          </div>
          <span className='text-sky-900 text-xl font-semibold'>{user.name}({user.role})</span>
          <button className='text-sky-900 text-xl font-semibold cursor-pointer ' onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className='flex gap-6 mt-6'>
        <div className='flex flex-col gap-6 w-[30%] h-screen rounded-2xl bg-sky-100 p-8' >
          <Link to="/dashboard" className='flex items-center text-sky-900 text-xl font-bold gap-2'><span><RxDashboard size={23} /></span> Dashboard</Link>
          <Link to="/employees" className='text-sky-900 text-xl font-bold flex  items-center gap-2'><span><AiOutlineTeam size={26} /></span> Employees</Link>
          <Link to="/teams" className='text-sky-900 text-xl font-bold flex  items-center gap-2'><span>< RiTeamLine size={25} /></span> Teams</Link>
        </div>
        <div className='w-[70%] flex'>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/employees" element={<EmployeeList user={EmployeeList} />} />
            <Route path="/teams" element={<TeamList user={TeamList} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

