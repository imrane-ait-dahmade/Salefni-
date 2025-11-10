import Navbar from './components/custom/navbar.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './pages/home.jsx';
import Simulation from './pages/simulation.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DemandeDetail from './pages/DemandeDetail.jsx';

function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/admin'];
  const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));

  if (shouldHideNavbar) return null;

  return (
    <Navbar>
      <Link to="/home" className='hover:text-[#00C896]'>Salfni</Link>
      <Link to="/simulation" className='hover:text-[#00C896]'>Simulation</Link>
      <Link to="/login" className='hover:text-[#00C896]'>Admin</Link>
    </Navbar>
  );
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavbarWrapper />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/simulation' element={<Simulation />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/demande/:id' element={<DemandeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}
