import React from 'react';
import Start from "./Start";
import Login from "./Login";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from"./Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Profile from "./Profile";
import More from './More';
import VideoScreen from './videoScreen';
const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();
const App = () => {
  function My({route}){
    return(
    <Tab.Navigator>
      <Tab.Screen 
      name='Home'
      component={Home}
      options={{headerShown:false,
      tabBarIcon:({color,size})=>(
        <MaterialIcon name='home' color={color} size={size}/>
      )
      }}
      /> 
      <Tab.Screen
      name='Profile'
      component={Profile}
      options={{headerShown:false,
      tabBarIcon:({color,size})=>(
        <MaterialIcon name='person' color={color} size={size}/>
      )
      }}
      />
      <Tab.Screen
      name='More'
      component={More}
      options={{headerShown:false,
      tabBarIcon:({color,size})=>(
        <MaterialIcon name='more-vert' color={color} size={size}/>
      )
      }}
      />
    </Tab.Navigator>
  )
}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Start'
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={My}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Screen'
          component={VideoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
