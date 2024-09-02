import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
// import Cookies from 'universal-cookie';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
//   const cookie = new Cookies();
  const [user_info , setInfo] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const login = async (username, password) => {
        try {
          const response = await axios.post('http://localhost:5000/login', {
            username: username,
            password: password,
          },{
          headers: {
            'Content-Type': 'application/json'
        }
        }
        
        );
    
          if (response.status === 200) {
             
            console.log('Login successful.');
    
            // Store the token in AsyncStorage
            
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log(response.data);
            console.log(localStorage.getItem('userInfo'));
            navigate('/')
    
            // Set the token in the app's state or context
            
        
          } else {
            console.error('Login failed:', response.data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
     
    login(username,password)
    
     //   setInfo(response.data);
    //    useEffect(() => {
    //     localStorage.setItem('auth',JSON.stringify(user_info));
    //    },[user_info]);
        
} 
    
 



  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
