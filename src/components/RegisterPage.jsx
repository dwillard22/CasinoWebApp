//This component renders the signup page for creating a user profile.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, email }),
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/profile');
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            console.error(err);
            setError('Network error');
        }
    };

    return (
        <div className="game-page">
            <h2>📝 Create Your Profile</h2>
            {error && <p className="message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email (optional):</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}
