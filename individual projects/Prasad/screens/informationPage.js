import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {useEffect, useRef, useState} from 'react';
import {apiErrors} from '../helpers/exceptionHelpers';

const InformationPage = () => {
  const playerRef = useRef();

  let [data, setData] = useState([]);
  let [doctorsData,setDoctorsData] = useState([]);
  const displayToastWithGravityAndOffset = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  async function fetchData() {
    try {
      const response = await fetch('https://www.myjsons.com/v/c8501270');
      const jsonData = await response.json();
      let arrayData = await jsonData.patients;
      setData(arrayData);

      const doctorsResponse = await fetch('https://www.myjsons.com/v/8e2c1266')
      const jsonDoctorsData = await doctorsResponse.json();
      let doctorArrayData = await jsonDoctorsData.doctors;
      setDoctorsData(doctorArrayData);

    } catch (error) {
      displayToastWithGravityAndOffset(apiErrors.unhandledException);
    } 
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView overScrollMode='never'>
    <View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <Image
          source={require('../assets/bynocs_logo.png')}
          style={{height: 110, width: 190}}
        />
      </View>
      <View style={{marginHorizontal: 30}}>
        <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
          Cloud Based software for managing lazy eyes and other eye conditions.
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 30,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <View style={{margin: 20}}>
          <Text style={{color: '#295C99', fontSize: 22, fontWeight: 'bold'}}>
            How Bynocs Work
          </Text>
          <Text style={{color: 'black', marginTop: 10}}>
          There are various games for better engagement, and it is recommended to play these games for 30-40 minutes and at least 5 times a week. Usually, the initial improvement is seen in 2 weeks, and a good result can be expected in 6-8 weeks in appropriate cases.
          </Text>
        </View>
      </View>

      <View style={{marginHorizontal: 30, marginTop: 20}}>
        <Text
          style={{
            color: '#295C99',
            fontSize: 22,
            marginLeft: 10,
            fontWeight: 'bold',
            marginBottom:15
          }}>
          What Doctors Say
        </Text>
      
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <ScrollView horizontal overScrollMode="never">
            {
              doctorsData.map(element => {
                // console.log(element.image);
                return (
                  <View style={{margin: 20}}>
                    <YoutubePlayer
                      ref={playerRef}
                      height={150}
                      width={250}
                      videoId={element.video}
                      play={false}
                      volume={50}
                      playbackRate={1}
                    />
                  </View>
                );
              })
              // </View>
            }
          </ScrollView>
        </View>
      </View>

      <View style={{marginHorizontal: 30, marginTop: 20,marginBottom:20}}>
        <Text
          style={{
            color: '#295C99',
            fontSize: 22,
            marginLeft: 10,
            fontWeight: 'bold',
            marginBottom:15
          }}>
          What Patients Say
        </Text>
      
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <ScrollView horizontal overScrollMode="never">
            {
              data.map(element => {
                console.log(element.image);
                return (
                  <View key={element.id} style={{margin: 20}}>
                    <YoutubePlayer
                      ref={playerRef}
                      height={150}
                      width={250}
                      videoId={element.link}
                      play={false}
                      volume={50}
                      playbackRate={1}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: element.image,
                        }}
                        style={{height: 45, width: 45}}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {element.Name}
                        </Text>
                        <Text></Text>
                      </View>
                    </View>
                  </View>
                );
              })
              // </View>
            }
          </ScrollView>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default InformationPage;
