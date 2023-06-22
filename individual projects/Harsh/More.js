import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const More = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
      <View>
        <View style={{ padding: 50 }}>
            <Text  onPress={handleLogout}>
              <Icon name="sign-out" size={18} /> Logout
            </Text>
        </View>
      </View>
  );
}

export default More;
