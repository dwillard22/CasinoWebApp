// server.js file for Express server setup and API endpoints

/* eslint-disable no-undef */
// casino_backend/server.js
import express from 'express';
import session from 'express-session';
import { init as initDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000; // default to 3000
app.use(express.json());

// Simple session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize DB and attaches it to req
initDb().then(async db => {
    app.use((req, res, next) => { req.db = db; next(); });

    // Mount routes
    app.use('/api/profile', (await import('./routes/profile.js')).default);
    app.use('/api/slots', (await import('./routes/slots.js')).default);

    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
});
