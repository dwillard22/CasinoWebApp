//This is a file for the ProfilePage component

import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch profile from our API
        fetch('/api/profile', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load profile', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Could not load profile.</p>;

    return (
        <div className="game-page">
            <h2>👤 Your Profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Coins:</strong> {profile.coins}</p>
        </div>
    );
}
