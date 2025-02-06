import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import auth

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tracker">Tracker</Link>
      <Link to="/visuals">Visuals</Link>
      <button onClick={() => auth.signOut()}>Logout</button>
    </nav>
  );
}