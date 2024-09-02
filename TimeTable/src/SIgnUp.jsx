import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    //  const response = axios.post('http://localhost:5000/signup', { username: username, password:password , type:userType  }, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    const login = async (username, password,userType) => {
        try {
          const response = await axios.post('http://localhost:5000/signup', {
            username: username,
            password: password,
            type: userType
          },{
          headers: {
            'Content-Type': 'application/json'
        }
        }
        
        );
          
          if (response.status === 200) {
             
            console.log('SignIn successful.');
    
            // Store the token in AsyncStorage
            
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log(response.data);
            console.log(localStorage.getItem('userInfo'));
            navigate('/')
    
            // Set the token in the app's state or context
            
        
          } else {
            console.error('Login failed:', response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
     
    login(username,password,userType)
    
    console.log({ username, password, userType });
  }

        
 
    
 



  return (
    <div className="login-container">
      <h2>Sign Up</h2>
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
        <div className="form-group">
          <label htmlFor="user-type">User Type:</label>
          <select
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <button type="submit" className="submit-button">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
