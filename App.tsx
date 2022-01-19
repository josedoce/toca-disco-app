import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AudioProvider } from './src/context/AudioProvier';
import { AudioList } from './src/screens/AudioList';


export default function App() {
  
  return (
    <AudioProvider>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <AudioList/>
        </View>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
