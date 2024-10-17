import { Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DemandPage from "./pages/DemandPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Statistics from './pages/StatisticsPage';
import Requests from './pages/RequestsPage';
import Payments from './pages/PaymentsPage';
import Managers from './pages/ManagersPage';
import User from "./pages/UsersPage";
import Settings from './pages/SettingsPage';
import HomePage from './pages/IndexPage';
import AppointmentPage from "./pages/AppointmentPage";
import TimeslotPage from "./pages/TimeslotPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!user.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
};

// Redirect authenticated users to the home page for certain routes (e.g., login, signup)
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
        return <Navigate to='/dashboard' replace />;
    }

    return children;
};

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'>
            <Routes>
                {/* Publicly accessible Landing Page */}
                <Route path='/' element={<HomePage />} />

                {/* Authenticated User Routes */}
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                
                {/* Auth Restricted Routes (redirect if authenticated) */}
                <Route
                    path='/signup'
                    element={
                        <RedirectAuthenticatedUser>
                            <SignUpPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <RedirectAuthenticatedUser>
                            <LoginPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route path='/verify-email' element={<EmailVerificationPage />} />
                <Route
                    path='/forgot-password'
                    element={
                        <RedirectAuthenticatedUser>
                            <ForgotPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />

                <Route
                    path='/reset-password/:token'
                    element={
                        <RedirectAuthenticatedUser>
                            <ResetPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />

                {/* Authenticated User Routes */}
                <Route
                    path='/demand-form'
                    element={
                        <ProtectedRoute><DemandPage /></ProtectedRoute>
                    }
                />
                <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute><AppointmentPage /></ProtectedRoute>} />
                <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
                <Route path="/create-timeslot" element={<ProtectedRoute><TimeslotPage /></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
                <Route path="/managers" element={<ProtectedRoute><Managers /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                {/* Catch all routes */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
