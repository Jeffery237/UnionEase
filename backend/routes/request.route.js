import express from 'express';
import {
    submitRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
    approveRequest
} from '../controllers/req.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/submit-request', verifyToken, submitRequest);
router.get('/requests', verifyToken, authorizeRoles("ADMIN", "MANAGER") , getAllRequests);
router.get('/show-requests/:id', verifyToken, getRequestById);
router.put('/update-request/:id', verifyToken, updateRequest);
router.delete('/delete-request/:id', verifyToken, authorizeRoles("ADMIN", "MANAGER"), deleteRequest);

export default router;