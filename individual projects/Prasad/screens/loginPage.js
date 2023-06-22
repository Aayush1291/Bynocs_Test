import {
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginErrors} from '../helpers/exceptionHelpers';
const Login = ({navigation}) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [isLoading, setLoading] = useState(false);

  const displayToastWithGravityAndOffset = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function validateInputs() {
    setLoading(true);
    if (username.length == 0 || password.length == 0) {
      displayToastWithGravityAndOffset(loginErrors.emptyFields);
      setLoading(false);
    } else {
      await authenticateUser();
    }
  }

  async function authenticateUser() {
    try {
      const response = await fetch('https://www.myjsons.com/v/68d11224');
      const jsonData = await response.json();
      const user = await jsonData.users.find(u => u.username === username);
      if (user) {
        if (user.password === password) {
          await AsyncStorage.setItem('loggedInUser', user.username);
          navigation.replace('Home');
        } else {
          displayToastWithGravityAndOffset(loginErrors.invalidPassword);
        }
      } else {
        displayToastWithGravityAndOffset(loginErrors.invalidUsername);
      }
    } catch (error) {
      console.log(error);
      displayToastWithGravityAndOffset(loginErrors.unhandledException);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <View
        style={{justifyContent: 'center', marginTop: 60, alignItems: 'center'}}>
        <Image
          source={require('../assets/bynocs_logo.png')}
          style={{height: 70, width: 140}}
        />
      </View>
      <View style={{}}>
        <Text
          style={{
            color: '#295C99',
            alignSelf: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 40,
          }}>
          Welcome Back
        </Text>
        <View style={{marginHorizontal: 50, marginTop: 40}}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '700'}}>
            Username
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#295C99',
              borderRadius: 15,
              color: 'black',
              marginTop: 10,
              paddingLeft: 20,
            }}
            placeholderTextColor={'black'}
            value={username}
            placeholder="Enter your username"
            onChangeText={text => setUsername(text)}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '700',
              marginTop: 15,
            }}>
            Password
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#295C99',
              borderRadius: 15,
              color: 'black',
              marginTop: 10,
              paddingLeft: 20,
            }}
            placeholderTextColor={'black'}
            value={password}
            placeholder="Enter  your password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity
            style={{
              marginTop: 15,
              borderRadius: 15,
              width: '100%',
              backgroundColor: '#295C99',
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
            }}
            onPress={() => (isLoading ? null : validateInputs())}>
            {isLoading ? (
              <ActivityIndicator color={'white'} size={25} />
            ) : (
              <Text style={{fontSize: 16, fontWeight: '500'}}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
