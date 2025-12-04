// server.js file for Express server setup and API endpoints

/* eslint-disable no-undef */
// casino_backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { init as initDb } from './db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON body parser
app.use(express.json());

// Basic session middleware (for auth demo)
app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize DB and attach to request for convenience
initDb().then(db => {
    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Mount API routes
    app.use('/api/leaderboard', leaderboardRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/slots', slotsRouter);

    // Start server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
