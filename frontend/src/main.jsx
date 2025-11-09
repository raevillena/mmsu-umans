import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import CssBaseline from "@mui/material/CssBaseline"; 
import './index.css'
import App from './App.jsx'
import AppTheme from './shared-theme/AppTheme';
import { GoogleOAuthProvider } from "@react-oauth/google";
import AlertSnackbar from './components/AlertSnackbar.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
          <AppTheme>
            <CssBaseline />
            <AlertSnackbar />
            <App />
          </AppTheme>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
