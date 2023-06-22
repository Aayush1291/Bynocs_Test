import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Image ,View} from "react-native";
import * as Animatable from 'react-native-animatable';

const Start = ({ navigation }) => {
  const handleAnimationEnd = async() => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      const isLoggedIn = await AsyncStorage.getItem('loggedIn');

      if (isFirstTime === null) {
        await AsyncStorage.setItem('isFirstTime', 'false');
        if (isLoggedIn === 'true') {
            navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      } else {
        if (isLoggedIn === 'true') {
            navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }  };
  return (
    <View style={{backgroundColor:'rgb(21,96,189)',flex:1}}> 

    <Animatable.View
      animation="fadeInDownBig"
      duration={5000}
      style={{ alignSelf: "center", marginTop: 300}}
      onAnimationEnd={handleAnimationEnd}
    >
      <Image source={require("./heart.png")} />
    </Animatable.View>
    </View>
  );
};

export default Start;
