// Simple registration form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (password !== confirm) {
            setError('Passwords must match');
            return;
        }
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const text = await res.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                throw new Error('Server did not return valid JSON.');
            }
            if (!res.ok || data.success === false) {
                throw new Error(data.error || `Server error: ${res.status}`);
            }
            navigate('/games');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    }

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <label>
                    Email or Username
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirm Password
                    <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                </label>
                <button type="submit" className="auth-button">Register</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
            <p className="auth-switch">
                Already have an account? <a href="/login">Log in here</a>
            </p>
        </div>
    );
}
