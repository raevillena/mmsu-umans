import axios from 'axios';
import { showSnackbar } from '../store/slices/snackbarSlice';


const URL = import.meta.env.VITE_FILE_UPLOAD_URL || 'http://localhost:5000/api/'

// Create a new axios instance for file uploads
const fileUpload = async (file, apiUrl, setLoading, dispatch) => {


  // Set the loading state for the file upload
  setLoading(true);

  const formData = new FormData();
  formData.append('file', file);
  const endpoint = `${URL}${apiUrl}`
  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Dispatch success message to show in the snackbar
    dispatch(showSnackbar({ message: 'File uploaded successfully!', severity: 'success' }));
    return response.data;
  } catch (error) {
    // Dispatch error message to show in the snackbar
    dispatch(showSnackbar({ message: 'File upload failed.', severity: 'error' }));
    throw error; // Re-throwing the error so it can be caught in the component
  } finally {
    // Turn off loading once the upload is complete
    setLoading(false);
  }
};

export default fileUpload;