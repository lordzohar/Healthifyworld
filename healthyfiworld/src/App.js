import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Visuals from './pages/Visuals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/visuals" element={<Visuals />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;