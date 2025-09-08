import {Router} from 'express'
import { getDashboard } from '../controllers/dashboard.controller.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: dashboards
 *     description: All CRUD operaitions for dashboards
 */

/**
 * @swagger
 * /dashboards:
 *   get:
 *     summary: List all dashboards
 *     description: return all dashboards ordered by id
 *     tags: [dashboards]
 *     responses:
 *       200:
 *         description: Dashboards.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/',getDashboard)

export default router;