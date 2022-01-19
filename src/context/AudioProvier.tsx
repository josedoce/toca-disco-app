import React, {useEffect, useState, createContext, ReactNode} from 'react';
import {
  Alert, View, Text
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export type AudioFile = {
  albumId?: string;
  creationTime?: number;
  duration?: number;
  filename: string;
  height?: number;
  id: string;
  mediaType?: string;
  modificationTime?: number;
  uri: string;
  width?: number;
}

type ContextData = {
  audioFiles: AudioFile[];
}

type AudioProviderProps = {
  children: ReactNode;
}

export const AudioContext = createContext({} as ContextData);
export function AudioProvider({children}:AudioProviderProps){
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [permissionError, setPermissionError] = useState<boolean>(false);

  const permissionAlert = () => {
    Alert.alert("Autorize-nos usar o amarzenamento",
    "Este aplicativo necessita acessar o amarzenamento para funcionar.",[
      {
        text: 'Autorizo',
        onPress: ()=> getPermission()
      },
      {
        text: 'Não',
        onPress: ()=>  permissionAlert()
      }
    ])
  }

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    //console.log(media.assets)
    setAudioFiles(media.assets)
  }

  const getPermission = async () => {
    const permission = await MediaLibrary
    .getPermissionsAsync();
    if(permission.granted){
      //queremos todos os audios
      getAudioFiles();
    }

    if(!permission.canAskAgain && !permission.granted){
      setPermissionError(true);
    }

    if(!permission.granted && permission.canAskAgain){
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
      
      if(status==='denied'&&canAskAgain){
        //exibimos um display alertando que o app
        //precisa de permissão pra funcionar
        permissionAlert();
      }

      if(status==='granted'){
        //queremos todos os audios
        getAudioFiles();
      }

      if(status==='denied' && !canAskAgain){
        //exibimos um display com um erro para o usuario
        setPermissionError(true);
      }
    }
  };

  useEffect(()=>{
    getPermission();
  },[])

  if(permissionError){
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
        <Text style={{
          fontSize: 25,
          textAlign: 'center',
          color: 'red'
        }}>Ao negar acesso ao armazenamento, não poderemos lhe oferecer nada. :(</Text>
      </View>
    )
  }

  return (
    <AudioContext.Provider value={{
      audioFiles
    }}>
      {children}
    </AudioContext.Provider>
  )
}