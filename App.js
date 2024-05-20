import { useCallback, useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import setDefaultProps from 'react-native-simple-default-props';

import {colors} from './variables';
import { UserProvider, useUser } from './storage/userContext';
import { AuthStack, TabStack } from './navigation/stacks';
import Loading from './components/loading';
import DatabaseInit from './database/databaseInit';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const db = DatabaseInit();
  const [fontsLoaded] = useFonts({
    'geo-thin': require('./assets/fonts/Geologica-Thin.ttf'),
    'geo-light': require('./assets/fonts/Geologica-Light.ttf'),
    'geo-medium': require('./assets/fonts/Geologica-Medium.ttf'),
    'geo-reg': require('./assets/fonts/Geologica-Regular.ttf'),
    'geo-semibold': require('./assets/fonts/Geologica-SemiBold.ttf'),
    'geo-bold': require('./assets/fonts/Geologica-Bold.ttf'),
    'geo-black': require('./assets/fonts/Geologica-Black.ttf')
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setDefaultProps(Text, {style: {fontFamily: 'geo-reg', marginTop: -3}});
      setDefaultProps(TextInput, {style: {fontFamily: 'geo-reg'}});
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    db.openAndInitDb();
  }, []);

  return fontsLoaded ?(
    <NavigationContainer>
      <UserProvider>
        <SafeAreaView onLayout={onLayoutRootView} style={{flex:1, backgroundColor: colors.darkGreen3}}>
          <StatusBar backgroundColor={colors.darkGreen3} style='light' />
          <Routes/>
        </SafeAreaView>
      </UserProvider>
    </NavigationContainer>
  ) : null;
}

const Routes = () => {
  const { loadingAuth, nome } = useUser();

  if(loadingAuth) {
      return <Loading />
  } else {
      return nome ? <TabStack /> : <AuthStack />
  }
}