// Navbar.js
import  { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after signing out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="bg-green-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-green-500 font-bold text-xl">
                HealthifyWorld
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:bg-green-50 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/tracker" className="text-gray-600 hover:bg-green-50 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                  Tracker
                </Link>
                {user ? (
                  <button onClick={handleSignOut} className="text-gray-600 hover:bg-green-50 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                    Signout
                  </button>
                ) : (
                  <Link to="/login" className="text-gray-600 hover:bg-green-50 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
