import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,Linking} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [apiData, setApiData] = useState('');
  const [secondApiData, setSecondApiData] = useState('');

  useEffect(() => {
    getLogged();
    getData();
  }, []);

  const getLogged = async () => {
    try {
      const loggedInName = await AsyncStorage.getItem('name');
      if (loggedInName) {
        setName(loggedInName);
      }
    } catch (error) {
      console.log('Error retrieving logged name:', error);
    }
  };

  const getData = () => {
    fetch('https://www.myjsons.com/v/8e2c1266')
.then(data=>data.json())
      .then((response) => {
        setApiData(response)
      })

    fetch('https://www.myjsons.com/v/c8501270')
    .then(data=>data.json())
    .then((response) => {
      setSecondApiData(response)
      })
  };
  const playVideo = (videoUrl) => {
    navigation.replace('Screen', { videoUrl });
    };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 15, fontWeight: 'bold', color: 'black' }}>
        Welcome {name}
      </Text>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>What Doctors Say</Text>

      <FlatList
        key={({index})=>index+1}
        data={apiData.doctors}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <YoutubePlayer
              height={300}
              width={350}
              margin={10}
              play={false}
              videoId={item.video}
            />
          </View>
        )}
      />
<Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>What Patients Say</Text>
      <FlatList
        key={(item, index) =>index+1}
        data={secondApiData.patients}
        horizontal={true}
        renderItem={({item}) => (
          <View style={{ margin:40 }}>
            <TouchableOpacity activeOpacity={1} onPress={() => playVideo(item.link)}>
            <Image
          source={{uri:item.image}}
          style={{ width: 80, height: 80, resizeMode: 'stretch' }}
            />
            <Text style={{textAlign:'left',marginTop:20,fontSize:20,fontFamily:'times new roman',color:'black'}}>{item.Name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default Home;