import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Components/navbar';
import HeroSection from './Components/hero';
import AddTransactionForm from './Components/tansaction';
import Totaltran from './Components/total_data_tran';
import SignUpForm from './Components/signup_page';
import LoginPage from './Components/Signin_page';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={() => auth.signOut().then(() => navigate('/signin', { replace: true }))}
      />

      <Routes>
        <Route path="/" element={<HeroSection />} />

        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/total-transaction" replace /> : <SignUpForm />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/total-transaction" replace /> : <LoginPage />}
        />
        <Route
          path="/add-transaction"
          element={isAuthenticated ? <AddTransactionForm /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/total-transaction"
          element={isAuthenticated ? <Totaltran /> : <Navigate to="/signin" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
