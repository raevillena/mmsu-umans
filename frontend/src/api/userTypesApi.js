import axiosInstance from './axiosInstance';


const userTypesApi = {
    addUserType: (newType) => axiosInstance.post("/type", newType),
    getUserTypes: () => axiosInstance.get("/type"),
    updateType: (id, data) => axiosInstance.put(`/type/${id}`, data),
    deleteType: (id) => axiosInstance.delete(`/type/${id}`),
  };


export default userTypesApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js