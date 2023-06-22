import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/homePage';
import Login from './screens/loginPage';
import Splash from './screens/splashPage';
const stack = createNativeStackNavigator();
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InformationPage from './screens/informationPage';
const Navigation = () => {
  let [isloggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  async function checkUserLoggedIn() {
    try {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        console.log('LOGGED IN');
        setLoggedIn(true);
      } else {
        console.log('NOT LOGGED IN');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* <stack.Group> */}
        <stack.Screen
          component={!isloggedIn ? Login : InformationPage}
          name={!isloggedIn ? 'Login' : 'InformationPage'}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          component={InformationPage}
          name="Infomation Page"
          options={{headerShown: false}}
        />
        <stack.Screen component={Splash} name="Splash" />
        {/* </stack.Group> */}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
