import axiosInstance from './axiosInstance';


const sessionsApi={
    getSessions: () => axiosInstance.get("/sessions"),
    getSessionsPaginated: (page = 1, limit = 10) => axiosInstance.get("/sessions/paginated", { params: { page, limit } }),
    deleteSession: (id) => axiosInstance.delete(`/sessions/${id}`),
  };


export default sessionsApi
// Look for the async slice functions to /src/store/slices/usersSlice.js