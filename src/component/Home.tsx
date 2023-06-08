import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => { 
   return (
    <div>
      <h1>Welcome to the Home Page</h1> 
      <nav className="navbar">

      <Link className="nav-link"  to="/about">Go to About</Link>
      <Link className="nav-link" to="/User">User</Link>
      <Link className="nav-link"  to="/Signup">Form</Link>
      </nav>
      
    </div>
  );
};

export default Home;
