import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import SignIn from './pages/Auth/SignIn'
import ProtectedRoute from "./components/headers/ProtectedRoute"; // Protect routes
import Users from "./pages/Dashboard/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadingScreen from './components/LoadingScreen';

//lazy components
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Apps = lazy(() => import("./pages/Dashboard/Apps"));
const UserTypes = lazy(() => import("./pages/Dashboard/UserTypes"));
const Roles = lazy(() => import("./pages/Dashboard/Roles"));
const Sessions = lazy(() => import("./pages/Dashboard/Sessions"));
const Logs = lazy(() => import("./pages/Dashboard/Logs"));
const About = lazy(() => import("./pages/Dashboard/About"));
const Contact = lazy(() => import("./pages/Dashboard/Contact"));
const NotFound = lazy(() => import("./pages/Dashboard/NotFound"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const PasswordReset = lazy(() => import("./pages/Dashboard/PasswordReset"));
const Trash = lazy(() => import("./pages/Dashboard/trash/TrashParent"));

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={
          <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
            <SignUp />
          </Suspense>
        } />

        {/* */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path = "/" element={<Dashboard />} />
            <Route path = "/users" element={<Users />} />
            <Route path = "/apps" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Apps />
              </Suspense>
            } />
            <Route path = "/roles" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Roles />
              </Suspense>
            } />
            <Route path = "/userTypes" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <UserTypes />
              </Suspense>
            } />
            <Route path = "/googleAccounts" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                 <Apps /> {/*change to google accounts component */}
              </Suspense>
            } />
            <Route path = "/sessions" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Sessions />
              </Suspense>
            } />
            <Route path = "/about" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <About />
              </Suspense>
            } />
            <Route path = "/contact" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Contact />
              </Suspense>
            } />
            <Route path = "/logs" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Logs />
              </Suspense>
            } />
            <Route path = "/profile" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Profile />
              </Suspense>
            } />
            <Route path = "/trash" element={
              <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
                <Trash />
              </Suspense>
            } />
          </Route>
        </Route>
        {/* insert other routes here*/}

        {/* password reset route */}
        <Route path="/reset-password/:token" element={
          <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
            <PasswordReset />
          </Suspense>
          } />

        {/* Catch All other routes */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;