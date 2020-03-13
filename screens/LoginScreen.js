import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createSwitchNavigator} from 'react-navigation'
import firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin';
// import { AccessToken, LoginManager } from 'react-native-fbsdk'
// import * as GoogleSignIn from 'expo-google-sign-in'

export default class LoginScreen extends React.Component {
   
    
    // Calling this function will open Google for login.
    googleLogin = async() => {
      try {
        // add any configuration settings here:
        await GoogleSignin.configure();
    
        const data = await GoogleSignin.signIn();
    
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    
        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      } catch (e) {
        console.error(e);
      }
    }

    render(){
        return (
            <View style={styles.container}>
                <Button title="Sign In With Google" onPress={() => alert("works")} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
