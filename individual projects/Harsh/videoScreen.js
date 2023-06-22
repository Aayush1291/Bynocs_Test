import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoScreen = ({ navigation,route}) => {
  const { videoUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <YoutubePlayer
          height={300}
          width={350}
          play={true}
          videoId={videoUrl}
        />
      </View>
      <View style={{ backgroundColor: 'blue',borderRadius:25,bottom:20,width:350}}>
        <TouchableOpacity activeOpacity={1} onPress={()=>{
            navigation.replace('Home')
        }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoScreen;
