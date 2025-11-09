import axiosInstance from './axiosInstance';


const appsApi = {
    createApp: (newApp) => axiosInstance.post("/apps", newApp),
    getApps: () => axiosInstance.get("/apps"),
    getAppbyId: (id) => axiosInstance.get(`/apps/${id}`),
    updateApp: (id, data) => axiosInstance.put(`/apps/${id}`, data),
    deleteApp: (id) => axiosInstance.delete(`/apps/${id}`),
  };


export default appsApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js