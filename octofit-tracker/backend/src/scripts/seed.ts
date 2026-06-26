import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

// Seed the octofit_db database with test data
async function seedDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await User.insertMany([
    { name: 'Ava Patel', email: 'ava@example.com', role: 'Athlete' },
    { name: 'Noah Kim', email: 'noah@example.com', role: 'Coach' },
    { name: 'Mina Chen', email: 'mina@example.com', role: 'Athlete' },
  ]);

  await Team.insertMany([
    { name: 'Momentum', sport: 'Running', members: 8, captain: 'Ava Patel' },
    { name: 'Peak Performance', sport: 'Cycling', members: 5, captain: 'Noah Kim' },
  ]);

  await Activity.insertMany([
    { user: 'Ava Patel', type: 'Run', durationMinutes: 35, distanceKm: 5.2, date: new Date('2026-06-20') },
    { user: 'Mina Chen', type: 'Cycling', durationMinutes: 45, distanceKm: 18.1, date: new Date('2026-06-21') },
  ]);

  await LeaderboardEntry.insertMany([
    { user: 'Ava Patel', score: 1280, streak: 7 },
    { user: 'Mina Chen', score: 1190, streak: 4 },
  ]);

  await Workout.insertMany([
    { title: 'HIIT Cardio', difficulty: 'Intermediate', durationMinutes: 30, focus: 'Endurance' },
    { title: 'Strength Builder', difficulty: 'Beginner', durationMinutes: 25, focus: 'Full Body' },
  ]);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
