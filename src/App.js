import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';
import { HabitFormProvider } from './context/HabitFormContext';

function App() {
  console.log('DOMAIN:', process.env.REACT_APP_AUTH0_DOMAIN);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid profile email',
      }}
    >
      <HabitFormProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </HabitFormProvider>
    </Auth0Provider>
  );
}
export default App;
