import { Router } from 'express';
import { getApiBaseUrl } from './config';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = Router();

const handleCollectionRoute = async (req: any, res: any, model: any) => {
  try {
    const items = await model.find({}).lean();
    res.json({ baseUrl: getApiBaseUrl(), data: items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data', details: error });
  }
};

router.get(['/api/users', '/api/users/'], async (req, res) => {
  await handleCollectionRoute(req, res, User);
});

router.get(['/api/teams', '/api/teams/'], async (req, res) => {
  await handleCollectionRoute(req, res, Team);
});

router.get(['/api/activities', '/api/activities/'], async (req, res) => {
  await handleCollectionRoute(req, res, Activity);
});

router.get(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  await handleCollectionRoute(req, res, LeaderboardEntry);
});

router.get(['/api/workouts', '/api/workouts/'], async (req, res) => {
  await handleCollectionRoute(req, res, Workout);
});

export default router;
