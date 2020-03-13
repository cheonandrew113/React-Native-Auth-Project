import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import LoadingScreen from './screens/LoadingScreen'
// import HomeScreen from './screens/HomeScreen'
// import LoginScreen from './screens/LoginScreen'
// import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from 'firebase'
import {firebaseConfig} from './config'
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component{
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render(){
    return (
      <StyledFirebaseAuth title="Click"
      uiConfig={this.uiConfig}/>
      <View style={styles.container}>

        
      </View>
      // <AppNavigator />
      // <View style={styles.container}>
      //   <Text> Hello </Text>
      //   {this.state.isSignedIn ? (
      //     // <Text> Hi </Text>
       
      //     <Button title="Click me" onPress={() => firebase.auth().signOut()} /> 
    
      //   ) : (
      //   )}
      // </View>
    )
  }
}

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   HomeScreen: HomeScreen
// })

// const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
