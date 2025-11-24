import React, { useState, useEffect } from 'react';

export default function TeamForm({ onSubmit, initial = null, onCancel }) {
    const [name, setName] = useState(initial?.name || '');
    const [description, setDescription] = useState(initial?.description || '');

    // Update form fields if a different team is selected for editing
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setName(initial?.name || '');
        setDescription(initial?.description || '');
    }, [initial]);

    async function submit(e) {
        e.preventDefault();

        if (!name.trim()) {
            alert("Team name is required");
            return;
        }

        await onSubmit({ name, description });

        if (!initial) {
            setName('');
            setDescription('');
        }
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: 10 }}>
            <input
                type="text"
                placeholder="Team name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <button type="submit">
                {initial ? 'Update' : 'Create'}
            </button>

            {onCancel && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}


// import React, { useState } from 'react';

// export default function TeamForm({ onSubmit, initial = null, onCancel }) {
//     const [name, setName] = useState(initial?.name || '');
//     const [description, setDescription] = useState(initial?.description || '');

//     async function submit(e) {
//         e.preventDefault();
//         await onSubmit({ name, description });
//         if (!initial) { setName(''); setDescription(''); }
//     }

//     return (
//         <form onSubmit={submit}>
//             <input placeholder="Team name" value={name} onChange={e => setName(e.target.value)} />
//             <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
//             <button type="submit">{initial ? 'Update' : 'Create'}</button>
//             {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
//         </form>
//     );
// }
