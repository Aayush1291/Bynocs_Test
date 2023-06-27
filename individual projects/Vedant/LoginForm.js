import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Hardcoded username and password for testing
    const validUsername = "admin";
    const validPassword = "password";
  
    if (username === validUsername && password === validPassword) {
      // Login successful
      console.log("Login successful");
      navigation.navigate('Home');

    } else {
      // Login failed
      console.log("Invalid username or password");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label>Username:</label>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
      <button className="login-button" type="submit">Log In</button>
      </div>
    </form>
  );
  
};

export default LoginForm;
