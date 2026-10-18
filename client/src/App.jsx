import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import SermonsPage from './pages/SermonsPage';
import FirstTimerPage from './pages/FirstTimerPage';
import ContactPage from './pages/ContactPage';
import FloatingActions from './components/FloatingActions';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboardHome from './admin/pages/AdminDashboardHome';
import AdminEvents from './admin/pages/AdminEvents';
import AdminSermons from './admin/pages/AdminSermons';
import AdminPrayerRequests from './admin/pages/AdminPrayerRequests';
import AdminAppointments from './admin/pages/AdminAppointments';
import AdminPartners from './admin/pages/AdminPartners';
import AdminFirstTimers from './admin/pages/AdminFirstTimers';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sermons" element={<SermonsPage />} />
        <Route path="/first-timer" element={<FirstTimerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="sermons" element={<AdminSermons />} />
            <Route path="prayer-requests" element={<AdminPrayerRequests />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="first-timers" element={<AdminFirstTimers />} />
          </Route>
        </Route>
      </Routes>
      {!isAdminRoute && <FloatingActions />}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

export default App;