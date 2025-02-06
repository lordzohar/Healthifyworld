import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Visuals from './pages/Visuals';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

export default function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/charts" element={<Visuals />} />
                    <Route path="/signup" element={<SignUp />} /> {/* Corrected route path */}
                </Routes>
            </div>
        </Router>
    );
}
