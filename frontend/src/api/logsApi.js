import axiosInstance from './axiosInstance';


export const getLogs = async (limit = 50) => {
    const response = await axiosInstance.get('/logs/', {
      params: { limit }, // attaches ?limit=50 to the URL
    });
    return response.data;
  };

  // Get logs with pagination
export const getLogsPaginated = async ( page = 1, limit = 10 ) => {
  const response = await axiosInstance.get('/logs/paginated/', {
    params: { page, limit },
  });
  return response.data;
};