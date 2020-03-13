import React from 'react';
import * as firebase from 'firebase'
import Expo from 'expo'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

const firebaseConfig = {
  apiKey: "AIzaSyDeH4gJMT80KIf6YXf-8SqenOQ5jqU7MRk",
  authDomain: "fir-auth-social-media.firebaseapp.com",
  databaseURL: "https://fir-auth-social-media.firebaseio.com",
  projectId: "fir-auth-social-media",
  storageBucket: "fir-auth-social-media.appspot.com",
  messagingSenderId: "980241211527",
  appId: "1:980241211527:web:d0a98643b053618b361822",
  measurementId: "G-XSMPKJHCZY"
}

if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig)
  } catch (err) {
      console.error("Firebase initialization error raised", err.stack)
  }
}

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  LogIn: LoginScreen,
  SignUp: SignUpScreen
})

export default createAppContainer(

  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: "Loading"
    }
  )
)