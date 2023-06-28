import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Errors from './Errors';
import { Image } from 'react-native';



const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login authentication here
    // For simplicity, we're using a hardcoded username and password
  
    if (username === 'Admin' && password === 'password') {
      // Redirect to home screen on successful login
      navigation.navigate('Home');
    } else {
      // Display an error message or perform any desired action for failed login
      console.log('Invalid username or password');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/bynocs.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default LoginScreen;
