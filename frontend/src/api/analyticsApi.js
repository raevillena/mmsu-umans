import axiosInstance from './axiosInstance';

const analyticsApi = {
  // Get overall statistics
  getOverview: () => axiosInstance.get('/analytics/overview'),
  
  // Get user growth statistics
  getUserGrowth: (period = 'monthly', limit = 12) => 
    axiosInstance.get(`/analytics/user-growth?period=${period}&limit=${limit}`),
  
  // Get app usage statistics
  getAppUsage: () => axiosInstance.get('/analytics/app-usage'),
  
  // Get activity statistics
  getActivityStats: (period = 'monthly', limit = 12) => 
    axiosInstance.get(`/analytics/activity?period=${period}&limit=${limit}`),
  
  // Get role distribution
  getRoleDistribution: () => axiosInstance.get('/analytics/role-distribution'),
  
  // Get office distribution
  getOfficeDistribution: () => axiosInstance.get('/analytics/office-distribution'),
  
  // Get recent activity
  getRecentActivity: (limit = 10) => 
    axiosInstance.get(`/analytics/recent-activity?limit=${limit}`),
  
  // Get top actions
  getTopActions: (limit = 10) => 
    axiosInstance.get(`/analytics/top-actions?limit=${limit}`),
};

export default analyticsApi;

