import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import { AuthContext } from '../AuthGuard/AuthProvider';  
const Home = () => { 
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
   return (
    <div>
      <h1>Welcome to the Home Page</h1> 
      {/* {isAuthenticated &&<MySnackbar message="you are authenticated" />} */}
      <nav className="navbar">

      <Link className="nav-link"  to="/about">Go to About</Link>
      {isAuthenticated && <Link className="nav-link" to="/User">User</Link>}
      <Link className="nav-link"  to="/Signup">Form</Link>
      </nav>
      {!isAuthenticated && <h1>login to navigate to User </h1>}
    </div>
  );
};

export default Home;
