import express from 'express';
const router = express.Router();
import {
  getOverview,
  getUserGrowth,
  getAppUsage,
  getActivityStats,
  getRoleDistribution,
  getOfficeDistribution,
  getRecentActivity,
  getTopActions
} from '../../controllers/analyticsController.js';
import { authenticateAdmin } from '../../middleware/auth.js';

/**
 * @openapi
 * /api/analytics/overview:
 *   get:
 *     summary: Get overall statistics and counts
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 activeUsers:
 *                   type: integer
 *                 inactiveUsers:
 *                   type: integer
 *                 totalApps:
 *                   type: integer
 *                 activeApps:
 *                   type: integer
 *                 totalRoles:
 *                   type: integer
 *                 totalUserTypes:
 *                   type: integer
 *                 activeSessions:
 *                   type: integer
 *                 totalAdmins:
 *                   type: integer
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/overview', authenticateAdmin, getOverview);

/**
 * @openapi
 * /api/analytics/user-growth:
 *   get:
 *     summary: Get user growth statistics over time
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *           default: monthly
 *         description: Time period for grouping
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of periods to return
 *     responses:
 *       200:
 *         description: User growth data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/user-growth', authenticateAdmin, getUserGrowth);

/**
 * @openapi
 * /api/analytics/app-usage:
 *   get:
 *     summary: Get app usage statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: App usage data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/app-usage', authenticateAdmin, getAppUsage);

/**
 * @openapi
 * /api/analytics/activity:
 *   get:
 *     summary: Get activity statistics over time
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *           default: monthly
 *         description: Time period for grouping
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of periods to return
 *     responses:
 *       200:
 *         description: Activity statistics retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/activity', authenticateAdmin, getActivityStats);

/**
 * @openapi
 * /api/analytics/role-distribution:
 *   get:
 *     summary: Get user role distribution
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role distribution data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/role-distribution', authenticateAdmin, getRoleDistribution);

/**
 * @openapi
 * /api/analytics/office-distribution:
 *   get:
 *     summary: Get office distribution statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Office distribution data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/office-distribution', authenticateAdmin, getOfficeDistribution);

/**
 * @openapi
 * /api/analytics/recent-activity:
 *   get:
 *     summary: Get recent activity logs
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of recent activities to return
 *     responses:
 *       200:
 *         description: Recent activity data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/recent-activity', authenticateAdmin, getRecentActivity);

/**
 * @openapi
 * /api/analytics/top-actions:
 *   get:
 *     summary: Get top actions statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of top actions to return
 *     responses:
 *       200:
 *         description: Top actions data retrieved successfully
 *       401:
 *         description: Unauthorized - Admin access required
 */
router.get('/top-actions', authenticateAdmin, getTopActions);

export default router;

