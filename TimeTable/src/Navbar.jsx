// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import profile_pic from "./profile.jpg"


function Navbar() {
  const [username, setUsername] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {
        try {
            const token_data = JSON.parse(token);
            console.log(token_data.username);
            setUsername(token_data.username); // Adjust based on your token structure
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
}, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/MyCourses">MyCourses</a></li>
        <li><a href="/contact">Contact</a></li>
        {isLoggedIn && (
                        <div style={{display:"flex"}}>
                            
                                <img
                                    src={profile_pic} // Replace with your profile icon path
                                    alt="Profile"
                                    style={{width:"40px",height:"40px",marginTop:"0px"}}
                                />
                                <span style={{marginLeft:"10px",marginTop:"15px"}}>{username}</span>
                            
                        </div>
                    ) }

      </ul>
    </nav>
  );
}

export default Navbar;
