import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {FONTS} from "./constants/fonts";
import { firebase } from './config';
import GetStarted from "./screens/GetStarted";
import Welcome from "./screens/Welcome";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Acceuil from "./screens/Acceuil";
import Humeur from "./screens/Humeur";
import Profile from "./screens/Profile";
import AddMood from "./screens/AddMood";
import BottomTabNavigator from "./navigation/bottomTabNavigator";

// Importations inchangées

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts(FONTS);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    if (!initializing && user) {
      if (user.emailVerified) {
        navigationRef.current?.navigate("Acceuil");
      } else {
        navigationRef.current?.navigate("Login");
      }
    }
  }, [initializing, user]);

  const onLayoutRootView = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded || initializing) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetStarted">
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Acceuil" component={BottomTabNavigator} />
          <Stack.Screen name="Humeur" component={Humeur} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AddMood" component={AddMood} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;