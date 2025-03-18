import './App.css';
import { AuthProvider } from '../user-auth/src/Components/AuthProvider';
import AdminLogin from '../user-auth/src/Components/UserLogin';
import MainLogin from '../user-auth/src/Layouts/MainLogin';
import UserLogin from '../user-auth/src/Components/CustomerRegistration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routingConstants } from '../user-auth/src/Constants/routingConstants';

function App() {
  const _router = [
    {
      path: routingConstants?.newLogin,
      element: <UserLogin />
    },
    {
      path: routingConstants?.userlogin,
      element: <AdminLogin />
    },
    {
      path: routingConstants?.mainLogin,
      element: <MainLogin />
    }
  ]
  return (
    <AuthProvider> {/* Wrap everything with AuthProvider */}
      <Router>
        <Routes>
          {_router.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
