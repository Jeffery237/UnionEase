
import express from 'express';
import { getManagersAndAdmins, addManager } from '../controllers/users.controller.js';

const router = express.Router();

// Endpoint to fetch managers and admins
router.get('/managers', getManagersAndAdmins);
router.post('/add-manager', addManager);

export default router;
