//import mui components
import { Divider, FormLabel, FormControl, TextField, Button, Checkbox, Typography, Box, Alert, CircularProgress } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../../components/ForgotPassword';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon, UmansLogoStyled } from '../../components/CustomIcons';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


//google imports
import { googleLogin, callback } from "../../store/slices/googleSlice"; // Update with actual path
import  googleApi from "../../api/googleApi" 
import { useGoogleLogin } from "@react-oauth/google";

//import react/redux components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import reducer functions
import { login } from "../../store/slices/authSlice";

//import validation resources
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import LoadingScreen from "../../components/LoadingScreen";

export const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export const LoginContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  width: '100vw',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login() {
  
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //run before rendering the component with the hook
  useEffect(() => {
    if (user) {
    navigate("/"); // Redirect to dashboard after login
    }
  }, [user, navigate]);

  ///google handlers
  
  const handleGoogle2 = useGoogleLogin({
    flow: "auth-code", // Use "auth-code" flow instead of "implicit"
    redirect_uri: 'http://localhost:3001/api/auth/google/callback',
    onSuccess: (response) => {
        console.log("Google Auth Code:", response.code);
        //dispatch(loginWithGoogle(response.code));
    },
    onError: (error) => console.error("Google Login Failed:", error),
  });

  const handleGoogle = async() => {
    try{
      const url = await googleApi.getGoogleLoginUrl(); // Send to backend
      const popup = window.open(url, "Google Login", "width=500,height=600");
      const checkPopup = setInterval(async () => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          
          // Get auth details from backend (assumes backend stores in session or cookie)
          console.log(popup)
          //const response = await callback();
          
          // Dispatch login action to store user data in Redux
          //dispatch(loginWithGoogle(response));

          console.log("Google Login Success:");
        }
      }, 1000);
    }catch(error){
      console.log("Google login error: ",error)
    }
  };

  const handleError = () => {
    console.error("Google Sign-In failed");
  };

  //password reset handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //sigin handler
  const onSubmit = async (data) => {
    try{
        const result = dispatch(login(data));
        if (result.meta?.requestStatus === "fulfilled") {
            navigate("/"); // Redirect after successful login
        }
    } catch (error){
        console.log(error)
    }
  };

  return (
    <div>
      {loading? <LoadingScreen caption='Loading...' /> : (
      <LoginContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <UmansLogoStyled style={{  width: 70, height: 70 }} />
            {/* <Typography sx={{fontStyle: 'bold', fontWeight: 'regular',  fontSize: 20, ml:1 }}>User Management System</Typography> */}
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors.email ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors.password ? 'error' : 'primary'}
                slotProps={{
                  input:{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }

                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox {...register("remember")} color="primary" checked={true} />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Loging in..." : "Sign in"}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogle2}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/register/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </LoginContainer>
      )}
    </div>
  );
}