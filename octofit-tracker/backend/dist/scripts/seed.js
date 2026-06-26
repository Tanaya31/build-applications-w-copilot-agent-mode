"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const database_1 = require("../config/database");
dotenv_1.default.config();
// Seed the octofit_db database with test data
async function seedDatabase() {
    const connection = await (0, database_1.connectToDatabase)();
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await models_1.User.insertMany([
        { name: 'Ava Patel', email: 'ava@example.com', role: 'Athlete' },
        { name: 'Noah Kim', email: 'noah@example.com', role: 'Coach' },
        { name: 'Mina Chen', email: 'mina@example.com', role: 'Athlete' },
    ]);
    await models_1.Team.insertMany([
        { name: 'Momentum', sport: 'Running', members: 8, captain: 'Ava Patel' },
        { name: 'Peak Performance', sport: 'Cycling', members: 5, captain: 'Noah Kim' },
    ]);
    await models_1.Activity.insertMany([
        { user: 'Ava Patel', type: 'Run', durationMinutes: 35, distanceKm: 5.2, date: new Date('2026-06-20') },
        { user: 'Mina Chen', type: 'Cycling', durationMinutes: 45, distanceKm: 18.1, date: new Date('2026-06-21') },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { user: 'Ava Patel', score: 1280, streak: 7 },
        { user: 'Mina Chen', score: 1190, streak: 4 },
    ]);
    await models_1.Workout.insertMany([
        { title: 'HIIT Cardio', difficulty: 'Intermediate', durationMinutes: 30, focus: 'Endurance' },
        { title: 'Strength Builder', difficulty: 'Beginner', durationMinutes: 25, focus: 'Full Body' },
    ]);
    console.log('Seed data inserted successfully');
    await connection.close();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
