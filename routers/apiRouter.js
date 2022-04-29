import express from 'express';
import version1 from '../controllers/apiController.js';

const router = express.Router();

router.route('/v1').get(version1);

export default router;
