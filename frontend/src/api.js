

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

function authHeaders(isJSON = true) {
    const token = localStorage.getItem('token');
    const headers = {};

    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (isJSON) headers['Content-Type'] = 'application/json';

    return headers;
}

async function handleResponse(r) {
    try {
        const data = await r.json();
        return data;
    } catch (err) {
        // If backend sends empty body or non-JSON
        console.log(err)
        return { error: 'Invalid server response', status: r.status };
    }
}

// ---------- AUTH ----------
export async function registerOrg(payload) {
    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function login(payload) {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

// ---------- EMPLOYEES ----------
export async function listEmployees() {
    try {
        const res = await fetch(`${API_BASE}/employees`, {
            method: 'GET',
            headers: authHeaders(false)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function createEmployee(payload) {
    try {
        const res = await fetch(`${API_BASE}/employees`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function updateEmployee(id, payload) {
    try {
        const res = await fetch(`${API_BASE}/employees/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function deleteEmployee(id) {
    try {
        const res = await fetch(`${API_BASE}/employees/${id}`, {
            method: 'DELETE',
            headers: authHeaders(false)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

// ---------- TEAMS ----------
export async function listTeams() {
    try {
        const res = await fetch(`${API_BASE}/teams`, {
            method: 'GET',
            headers: authHeaders(false)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function createTeam(payload) {
    try {
        const res = await fetch(`${API_BASE}/teams`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function updateTeam(id, payload) {
    try {
        const res = await fetch(`${API_BASE}/teams/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function deleteTeam(id) {
    try {
        const res = await fetch(`${API_BASE}/teams/${id}`, {
            method: 'DELETE',
            headers: authHeaders(false)
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

// ---------- ASSIGN / UNASSIGN ----------
export async function assignEmployeeToTeam(employeeId, teamId) {
    try {
        const res = await fetch(`${API_BASE}/employees/assign`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ employeeId, teamId })
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}

export async function unassignEmployeeFromTeam(employeeId, teamId) {
    try {
        const res = await fetch(`${API_BASE}/employees/unassign`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ employeeId, teamId })
        });
        return handleResponse(res);
    } catch {
        return { error: 'Network error' };
    }
}
