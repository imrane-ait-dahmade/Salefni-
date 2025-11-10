
import Navbar from './components/custom/navbar.jsx'
import Button from './components/custom/button.jsx'
import SearchBar from './components/custom/searchbar.jsx'
import { useState } from 'react';
import Form from './components/custom/form.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home.jsx';
import Simulation from './pages/simulation.jsx';
export default function App() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputs = [
    { type: 'text', name: 'name', placeholder: 'Your Name', value: formData.name, onChange: handleChange },
    { type: 'email', name: 'email', placeholder: 'Your Email', value: formData.email, onChange: handleChange }
  ];

  return (
    <div className="App">
       <Router>
      <Navbar>
       <Link to="/home" className='hover:text-[#00C896]'>Salfni</Link>
        <Link to="/simulation" className='hover:text-[#00C896]'>Simulation</Link>
      </Navbar>
     
      

      <Routes>
        <Route path="/home" element={<Home />} />
       <Route path='/simulation' element={<Simulation  />} />
      </Routes>
    </Router>
    </div>
  );
}


