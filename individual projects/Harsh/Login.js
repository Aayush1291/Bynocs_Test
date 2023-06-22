import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import errorMessages from './errorMessages';
const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [apiData, setApiData] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const[errorMessage,setErrorMessages]=useState('');
  useEffect(() => {
    checkLoginStatus();
    getData();
  }, []);

  const getData = () => {
    fetch('https://www.myjsons.com/v/68d11224')
      .then((data) => data.json())
      .then((response) => {
        setApiData(response);
      });
  };
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('loggedIn');
      if (isLoggedIn === 'true') {
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const checkLogin = async () => {
    if (!name || !password) {
      if (!name) {
        setNameError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
      return;
    }

    const loggedIn = apiData.users.find((user) => user.username === name && user.password === password);

    if (loggedIn) {
      try {
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('name',name);
        navigation.replace('Home');
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      try{
      if (!apiData.users.find((user) => user.username=== name)){
        setErrorMessages(errorMessages.invalidUsername)
      }
      else if(!apiData.users.find((user) => user.password=== password)){
        setErrorMessages(errorMessages.invalidPassword)
      }
        if(!apiData.users.find((user) => user.username=== name))
        {
          if(!apiData.users.find((user) => user.password=== password))
          {
          setErrorMessages(errorMessages.bothIncorrect)
          }
        }
    }catch(error){
      setErrorMessages(errorMessages.unhandledException)
    }
  }
  };

  return (
    <View>
      <View style={{ backgroundColor: 'lightskyblue', alignItems: 'center' }}>
        <Image source={require('./bynocs.png')} style={{ alignSelf: 'center', margin: 100 }} />
      </View>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, borderRadius: 10, 
        width: 250, 
        borderColor: nameError ? 'red' : 'black', 
        height: 50, 
        paddingLeft: 10,
        marginTop:50,
        marginLeft:60
        }}>
          <MaterialIcons name='account-circle' style={{color:'black'}} size={24}/>
        <TextInput
          maxLength={10}
          style={{ flex: 1 }}
          onChangeText={(text) => {
            setName(text);
            setNameError(false);
          }}
          value={name}
          placeholder="UserName"
        />
      </View>
      {nameError && <Text style={{ color: 'red', marginLeft: 60 }}>Username is required.</Text>}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderRadius: 10, 
        width: 250, 
        borderColor: passwordError ? 'red' : 'black', height: 50, 
        paddingLeft: 10, 
        marginTop: 50,
        marginLeft:60
         }}>
          <MaterialIcons name='lock' style={{color:'black'}} size={24}/>
        <TextInput
          maxLength={10}
          style={{ flex: 1 }}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(false);
          }}
          value={password}
          placeholder="Password"
          secureTextEntry={!showPassword}
          />
        <Octicons name={showPassword ? 'eye' : 'eye-closed'}style={{color:'black',marginRight:10}} size={24} onPress={() => setShowPassword(!showPassword)}
/>
      </View>
      {passwordError && <Text style={{ color: 'red', marginLeft: 60 }}>Passowrd is required.</Text>}

      <View style={{ padding: 10, margin: 40 }}>
        <TouchableOpacity onPress={checkLogin} activeOpacity={1}>
          <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 20 }}>
            <Text style={{ color: 'white', textAlign: 'center',fontSize: 20}}>LOGIN</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ backgroundColor: errorMessage?'grey':'', marginLeft: 40, marginRight: 20, padding: 10, borderRadius: 5, fontSize: 16, fontWeight: 'bold', color: 'white', marginTop: 20 }}>
  {errorMessage}
</Text>
    </View>
  );
}; 
export default Login;