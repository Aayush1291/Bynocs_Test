import {Text, View, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateHelpers from '../helpers/dateHelpers';
const Home = () => {
  let [username, setUsername] = useState('');

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours(); 
  var min = new Date().getMinutes(); 
  var sec = new Date().getSeconds();
    var dateHelper = new DateHelpers();
  async function fetchUsername() {
    uname = await AsyncStorage.getItem('loggedInUser');
    
    setUsername(uname);
  }

  useEffect(() => {
    fetchUsername();
  }, []);
  return (
    <View>
      
      <View
        style={{
          flexDirection: 'row',
          margin: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
          Thursday {date}, {dateHelper.monthIndexToMonth(month)} 2022
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="bell-o"
            color={'black'}
            size={23}
            style={{marginRight: 20}}
          />
          <Icon name="user-o" color={'black'} size={23} />
        </View>
      </View>

      <View style={{margin: 20}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
          Welcome Back,
        </Text>
        <Text style={{fontSize: 21, color: '#295C99', marginTop: 5}}>
          {username}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 25,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 85,
            width: 85,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
            Upcoming
          </Text>
          <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
            03
          </Text>
        </View>

        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
            Attended
          </Text>
          <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
            13
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
            Total
          </Text>
          <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
            16
          </Text>
        </View>
      </View>

      <View style={{margin: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Upcoming Appointments
          </Text>
          <TouchableOpacity>
            <Text style={{color: '#295C99', fontWeight: 'bold', fontSize: 15}}>
              View More
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};
export default Home;
