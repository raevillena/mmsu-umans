// Description: Analytics controller for dashboard statistics and insights
import { User, Apps, Roles, UserTypes, RefreshToken, ActionLog, GoogleUser, Mqtt } from '../models/index.js';
import { Op, Sequelize } from '@sequelize/core';

/**
 * Get overall statistics (counts)
 * GET /api/analytics/overview
 */
export const getOverview = async (req, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalApps,
      activeApps,
      totalRoles,
      totalUserTypes,
      activeSessions,
      totalAdmins,
      totalGoogleUsers,
      totalMqttUsers
    ] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      Apps.count(),
      Apps.count({ where: { isActive: true } }),
      Roles.count({ where: { isActive: true } }),
      UserTypes.count({ where: { isActive: true } }),
      RefreshToken.count({ 
        where: { 
          expiresAt: { [Op.gt]: new Date() } 
        } 
      }),
      User.count({ where: { role: 'admin', isActive: true } }),
      GoogleUser.count(),
      Mqtt.count()
    ]);

    res.json({
      msg: 'Overview statistics retrieved successfully.',
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        totalApps,
        activeApps,
        inactiveApps: totalApps - activeApps,
        totalRoles,
        totalUserTypes,
        activeSessions,
        totalAdmins,
        regularUsers: activeUsers - totalAdmins,
        totalGoogleUsers,
        totalMqttUsers,
      },
    });
  } catch (error) {
    console.error('[analytics:getOverview] Failed to fetch overview statistics:', error);
    return res.status(400).json({
      msg: 'Failed to fetch overview statistics.',
      error: error.message,
    });
  }
};

/**
 * Get user growth statistics over time
 * GET /api/analytics/user-growth?period=monthly|weekly|daily
 */
export const getUserGrowth = async (req, res, next) => {
  try {
    const period = req.query.period || 'monthly'; // monthly, weekly, daily
    const limit = parseInt(req.query.limit) || 12; // Number of periods to return
    
    let dateFormat, groupBy;
    
    // Determine date format and grouping based on period
    switch (period) {
      case 'daily':
        dateFormat = '%Y-%m-%d';
        groupBy = 'day';
        break;
      case 'weekly':
        dateFormat = '%Y-%u'; // Year-Week
        groupBy = 'week';
        break;
      case 'monthly':
      default:
        dateFormat = '%Y-%m';
        groupBy = 'month';
        break;
    }

    // Get user registrations grouped by period
    const userGrowth = await User.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), dateFormat), 'period'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['period'],
      order: [[Sequelize.literal('period'), 'ASC']],
      limit: limit,
      raw: true
    });

    // Get cumulative counts
    let cumulative = 0;
    const growthData = userGrowth.map(item => {
      cumulative += parseInt(item.count);
      return {
        period: item.period,
        newUsers: parseInt(item.count),
        totalUsers: cumulative
      };
    });

    res.json({
      msg: 'User growth statistics retrieved successfully.',
      data: {
      period: groupBy,
        data: growthData,
      },
    });
  } catch (error) {
    console.error('[analytics:getUserGrowth] Failed to fetch user growth statistics:', error);
    return res.status(400).json({
      msg: 'Failed to fetch user growth statistics.',
      error: error.message,
    });
  }
};

/**
 * Get app usage statistics
 * GET /api/analytics/app-usage
 */
export const getAppUsage = async (req, res, next) => {
  try {
    // Get user count per app using the through relationship
    const appUsage = await Apps.findAll({
      attributes: [
        'id',
        'name',
        'ownerOffice',
        'isActive',
        [Sequelize.fn('COUNT', Sequelize.col('Users.id')), 'userCount']
      ],
      include: [{
        model: User,
        attributes: [],
        through: {
          model: Roles,
          attributes: [],
          where: { isActive: true }
        },
        required: false
      }],
      group: ['Apps.id', 'Apps.name', 'Apps.ownerOffice', 'Apps.isActive'],
      order: [[Sequelize.literal('userCount'), 'DESC']],
      raw: false
    });

    // Format the response
    const formattedData = appUsage.map(app => ({
      id: app.id,
      name: app.name,
      ownerOffice: app.ownerOffice,
      isActive: app.isActive,
      userCount: parseInt(app.dataValues.userCount || 0)
    }));

    res.json({
      msg: 'App usage data retrieved successfully.',
      data: formattedData,
    });
  } catch (error) {
    console.error('[analytics:getAppUsage] Failed to fetch app usage data:', error);
    return res.status(400).json({
      msg: 'Failed to fetch app usage data.',
      error: error.message,
    });
  }
};

/**
 * Get activity statistics over time
 * GET /api/analytics/activity?period=monthly|weekly|daily&limit=12
 */
export const getActivityStats = async (req, res, next) => {
  try {
    const period = req.query.period || 'monthly';
    const limit = parseInt(req.query.limit) || 12;
    
    let dateFormat, groupBy;
    
    switch (period) {
      case 'daily':
        dateFormat = '%Y-%m-%d';
        groupBy = 'day';
        break;
      case 'weekly':
        dateFormat = '%Y-%u';
        groupBy = 'week';
        break;
      case 'monthly':
      default:
        dateFormat = '%Y-%m';
        groupBy = 'month';
        break;
    }

    // Get activity logs grouped by period
    const activityStats = await ActionLog.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), dateFormat), 'period'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['period'],
      order: [[Sequelize.literal('period'), 'ASC']],
      limit: limit,
      raw: true
    });

    const formattedData = activityStats.map(item => ({
      period: item.period,
      count: parseInt(item.count)
    }));

    res.json({
      msg: 'Activity statistics retrieved successfully.',
      data: {
      period: groupBy,
        data: formattedData,
      },
    });
  } catch (error) {
    console.error('[analytics:getActivityStats] Failed to fetch activity statistics:', error);
    return res.status(400).json({
      msg: 'Failed to fetch activity statistics.',
      error: error.message,
    });
  }
};

/**
 * Get user role distribution
 * GET /api/analytics/role-distribution
 */
export const getRoleDistribution = async (req, res, next) => {
  try {
    const roleDistribution = await User.findAll({
      attributes: [
        'role',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['role'],
      raw: true
    });

    const formattedData = roleDistribution.map(item => ({
      role: item.role,
      count: parseInt(item.count)
    }));

    res.json({
      msg: 'Role distribution retrieved successfully.',
      data: formattedData,
    });
  } catch (error) {
    console.error('[analytics:getRoleDistribution] Failed to fetch role distribution:', error);
    return res.status(400).json({
      msg: 'Failed to fetch role distribution.',
      error: error.message,
    });
  }
};

/**
 * Get office distribution
 * GET /api/analytics/office-distribution
 */
export const getOfficeDistribution = async (req, res, next) => {
  try {
    const officeDistribution = await User.findAll({
      attributes: [
        'office',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: { 
        isActive: true,
        office: { [Op.ne]: null }
      },
      group: ['office'],
      order: [[Sequelize.literal('count'), 'DESC']],
      raw: true
    });

    const formattedData = officeDistribution.map(item => ({
      office: item.office || 'Unassigned',
      count: parseInt(item.count)
    }));

    res.json({
      msg: 'Office distribution retrieved successfully.',
      data: formattedData,
    });
  } catch (error) {
    console.error('[analytics:getOfficeDistribution] Failed to fetch office distribution:', error);
    return res.status(400).json({
      msg: 'Failed to fetch office distribution.',
      error: error.message,
    });
  }
};

/**
 * Get recent activity logs
 * GET /api/analytics/recent-activity?limit=10
 */
export const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const recentActivity = await ActionLog.findAll({
      attributes: ['id', 'action', 'details', 'targetType', 'ipAddress', 'createdAt'],
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName'],
        as: 'user',
        required: false
      }],
      order: [['createdAt', 'DESC']],
      limit: limit
    });

    const formattedData = recentActivity.map(log => ({
      id: log.id,
      action: log.action,
      details: log.details,
      targetType: log.targetType,
      ipAddress: log.ipAddress,
      createdAt: log.createdAt,
      user: log.user ? {
        id: log.user.id,
        email: log.user.email,
        name: `${log.user.firstName} ${log.user.lastName}`
      } : null
    }));

    res.json({
      msg: 'Recent activity retrieved successfully.',
      data: formattedData,
    });
  } catch (error) {
    console.error('[analytics:getRecentActivity] Failed to fetch recent activity:', error);
    return res.status(400).json({
      msg: 'Failed to fetch recent activity.',
      error: error.message,
    });
  }
};

/**
 * Get top actions statistics
 * GET /api/analytics/top-actions?limit=10
 */
export const getTopActions = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const topActions = await ActionLog.findAll({
      attributes: [
        'action',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['action'],
      order: [[Sequelize.literal('count'), 'DESC']],
      limit: limit,
      raw: true
    });

    const formattedData = topActions.map(item => ({
      action: item.action,
      count: parseInt(item.count)
    }));

    res.json({
      msg: 'Top actions retrieved successfully.',
      data: formattedData,
    });
  } catch (error) {
    console.error('[analytics:getTopActions] Failed to fetch top actions:', error);
    return res.status(400).json({
      msg: 'Failed to fetch top actions.',
      error: error.message,
    });
  }
};

