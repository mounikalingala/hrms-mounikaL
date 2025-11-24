import React, { useState, useEffect } from 'react';
import { listTeams, createTeam, updateTeam, deleteTeam } from '../api';
import TeamForm from './TeamForm';
import { FaPlus } from 'react-icons/fa';

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false)

    async function load() {
        try {
            const data = await listTeams();
            setTeams(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed loading teams:", err);
            setTeams([]);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load();
    }, []);

    async function create(payload) {
        await createTeam(payload);
        await load();
    }
    console.log(teams)
    async function save(id, payload) {
        await updateTeam(id, payload);
        setEditing(null);
        await load();
    }

    async function remove(id) {
        if (!window.confirm('Delete team?')) return;
        await deleteTeam(id);
        await load();
    }
    console.log(teams)
    return (
        <div>
            <div className=' flex gap-40 justify-between px-12 py-4'>
                <h2 className=' text-center text-4xl text-sky-900  font-semibold' >List of Teams </h2>
                <button className='flex items-center gap-2 text-sky-100 text-xl font-semibold bg-sky-900 rounded-xl p-4 cursor-pointer hover:bg-sky-800 '><span><FaPlus /></span> Create Teams</button>
            </div>
            <TeamForm onSubmit={create} />
            <hr />

            {teams.map(t => (
                <div key={t.id} >
                    <div><strong>{t.name}</strong></div>
                    <div>{t.description}</div>

                    <div>
                        <button onClick={() => setEditing(t)}>Edit</button>
                        <button onClick={() => remove(t.id)}>Delete</button>
                    </div>

                    {editing && editing.id === t.id && (
                        <TeamForm
                            initial={editing}
                            onSubmit={(payload) => save(t.id, payload)}
                            onCancel={() => setEditing(null)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}


// import React, { useState, useEffect } from 'react';
// import { listTeams, createTeam, updateTeam, deleteTeam } from '../api';
// import TeamForm from './TeamForm';

// export default function TeamList() {
//     const [teams, setTeams] = useState([]);
//     const [editing, setEditing] = useState(null);

//     async function load() { setTeams(await listTeams()); }

//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     useEffect(() => { load(); }, []);

//     async function create(payload) { await createTeam(payload); await load(); }
//     async function save(id, payload) { await updateTeam(id, payload); setEditing(null); await load(); }
//     async function remove(id) { if (!confirm('Delete team?')) return; await deleteTeam(id); await load(); }

//     return (
//         <div>
//             <TeamForm onSubmit={create} />
//             <hr />
//             {teams.map(t => (
//                 <div key={t.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
//                     <div><strong>{t.name}</strong></div>
//                     <div>{t.description}</div>
//                     <div>
//                         <button onClick={() => setEditing(t)}>Edit</button>
//                         <button onClick={() => remove(t.id)}>Delete</button>
//                     </div>
//                     {editing && editing.id === t.id && <TeamForm initial={editing} onSubmit={(payload) => save(t.id, payload)} onCancel={() => setEditing(null)} />}
//                 </div>
//             ))}
//         </div>
//     );
// }
