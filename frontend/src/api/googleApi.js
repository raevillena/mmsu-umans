import axiosInstance from './axiosInstance';

const googleApi = {
    getGoogleLoginUrl: async () => {
      const response = await axiosInstance.get("/auth/google/url")
      return response.data.url
    },
    callback: (code) => axiosInstance.get("/auth/google/callback", code),
    loginGoogleUser: (userInfo) => {
      axiosInstance.post("/auth/google/regislog", userInfo)
    }
};

export default googleApi;
// Look for the async slice functions to /src/store/slices/googleSlice.js