import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Audio, AVPlaybackStatus} from 'expo-av';
import { AudioContext, AudioFile } from '../context/AudioProvier';
import { useState } from 'react';

export function AudioList(){
  const {audioFiles} = useContext(AudioContext);
  const [playback, setPlayback] = useState<Audio.Sound>({} as Audio.Sound);
  const [soundObj, setSoundObj] = useState<AVPlaybackStatus>();
  const [currentAudio, setCurrentAudio] = useState<AudioFile>({} as AudioFile);

  const stop = async () => {
    const playsound = new Audio.Sound();
    
    
  }
  
  const playSound = async (audio: AudioFile) => {
    console.log(audio)
    //roda o adui pela primeira vez.
    if(soundObj === undefined){
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        {uri: audio.uri},
        {shouldPlay: true}
      )
      setPlayback(playbackObj);
      setCurrentAudio(audio);
      setSoundObj(status);
      
    }

    //pausa o audio
    if(soundObj.isLoaded && soundObj.isPlaying){
      const status = await playback.setStatusAsync({shouldPlay: false});
      setSoundObj(status);
    }

    //continue audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
      const status = await playback.playAsync();
      setSoundObj(status);
    }

  }
  return (
    <View style={styles.container}>
       <Text>Audio List</Text>
       <TouchableOpacity onPress={stop}>
         <Text>Stop</Text>
       </TouchableOpacity>
       <Text>Total {audioFiles.length}</Text>
        <ScrollView>
          {
            audioFiles.map((e)=>(
              <View key={e.id}>
                <TouchableOpacity 
                  onPress={()=>playSound(e)}>
                  <Text style={styles.music}>
                    {e.filename}
                  </Text>
                </TouchableOpacity>
              <View
                style={styles.separator}/>
              </View>
            ))
          }
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    marginTop: 30
  },
  music: {
    paddingVertical: 10,
    fontSize: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  }
});