
import axiosInstance from './axiosInstance';


const authApi = {
    login: (credentials) => axiosInstance.post("/auth/superLogin", credentials),
    logout: () => axiosInstance.post("/auth/logout"),
    refreshToken: (user) => axiosInstance.post("/auth/refresh", user),
    isAuthenticated: () => axiosInstance.get("/auth/isAuthenticated"),
    getGoogleLoginUrl: () => axiosInstance.get("/auth/google/url"),
  };

export const requestPasswordReset = async (email) => {
   const response = await axiosInstance.post('auth/request-passwd-reset',{
    email:email
   })
   return response.data
} 

export const resetPasswordWithToken = async (token, newPassword) => {
  const response = await axiosInstance.post('auth/reset-passwd',{
   token:token,
   newPassword:newPassword
  })
  return response.data
} 

export default authApi;
// Look for the async slice functions to /src/store/slices/authSlice.js