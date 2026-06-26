import mongoose, { Schema, model, Model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: number;
  captain: string;
}

export interface IActivity extends Document {
  user: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  user: string;
  score: number;
  streak: number;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
