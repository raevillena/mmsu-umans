import Grid from '@mui/material/Grid2';
import { Alert, Typography, Box, Button, Stack,Divider, TextField, FormLabel, FormControl, Link, CssBaseline } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon, UmansLogoStyled } from '../../components/CustomIcons';

import UmansLogo from '../../assets/umans.svg?react';

//import logic components from react and redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import reducer functions
import { createUser } from "../../store/slices/usersSlice";


//import validation resources
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";


export const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '650px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  width: '100vw',
  flex:1,
  justifyContent: 'space-between',
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

export default function SignUp(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {message, loading, error } = useSelector((state) => state.users);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    //delete data.confirmPassword;
    try{ 
      const result = await dispatch(createUser(data))
        if (result.meta.requestStatus === "fulfilled") {
           navigate("/login")
        }
    } catch (error){
        console.log(error)
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" maxWidth="calc((1 - var(--template-frame-width, 0)) * 100dvw)">
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
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Grid container spacing={2} columns={12}>
              {/* firstName Field */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <TextField
                      {...register("firstName")}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      placeholder="Raymart"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      color={!!errors.firstName ? 'error' : 'primary'}
                    />
                </FormControl>
              </Grid>
              {/*lastName field */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <TextField
                      {...register("lastName")}
                      autoComplete="family-name"
                      name="lastName"
                      required
                      fullWidth
                      id="lastName"
                      placeholder="Villena"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      color={!!errors.lastName ? 'error' : 'primary'}
                      />
                </FormControl>
              </Grid>
              {/* Email Field */}
              <Grid size={{xs:12, sm:12}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                      {...register("email")}
                      required
                      fullWidth
                      id="email"
                      placeholder="your@email.com"
                      name="email"
                      autoComplete="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      color={errors.email ? 'error' : 'primary'}
                    />
                </FormControl>
              </Grid>
              {/*mobile number field */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="mobileNo">Mobile Number</FormLabel>
                    <TextField
                      {...register("mobileNo")}
                      autoComplete="phone"
                      name="mobileNo"
                      required
                      fullWidth
                      id="mobileNo"
                      placeholder="09123456789"
                      error={!!errors.mobileNo}
                      helperText={errors.mobileNo?.message}
                      color={!!errors.mobileNo ? 'error' : 'primary'}
                      />
                </FormControl>
              </Grid>
              {/*Office field */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="office">Office/Unit</FormLabel>
                    <TextField
                      {...register("office")}
                      autoComplete="office"
                      name="office"
                      required
                      fullWidth
                      id="office"
                      placeholder="NBERIC"
                      error={!!errors.office}
                      helperText={errors.office?.message}
                      color={!!errors.office ? 'error' : 'primary'}
                      />
                </FormControl>
              </Grid>
              {/* Password */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                      {...register("password")}
                      required
                      fullWidth
                      name="password"
                      placeholder="••••••••"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      color={errors.password ? 'error' : 'primary'}
                    />
                </FormControl>
              </Grid>
              {/* Reenter password */}
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="confirmPassword"> Re-enter Password</FormLabel>
                    <TextField
                      {...register("confirmPassword")}
                      required
                      fullWidth
                      name="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      variant="outlined"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      color={errors.confirmPassword ? 'error' : 'primary'}
                    />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/login/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
