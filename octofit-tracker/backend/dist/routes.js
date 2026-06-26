"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("./config");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const handleCollectionRoute = async (req, res, model) => {
    try {
        const items = await model.find({}).lean();
        res.json({ baseUrl: (0, config_1.getApiBaseUrl)(), data: items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load data', details: error });
    }
};
router.get(['/api/users', '/api/users/'], async (req, res) => {
    await handleCollectionRoute(req, res, models_1.User);
});
router.get(['/api/teams', '/api/teams/'], async (req, res) => {
    await handleCollectionRoute(req, res, models_1.Team);
});
router.get(['/api/activities', '/api/activities/'], async (req, res) => {
    await handleCollectionRoute(req, res, models_1.Activity);
});
router.get(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    await handleCollectionRoute(req, res, models_1.LeaderboardEntry);
});
router.get(['/api/workouts', '/api/workouts/'], async (req, res) => {
    await handleCollectionRoute(req, res, models_1.Workout);
});
exports.default = router;
