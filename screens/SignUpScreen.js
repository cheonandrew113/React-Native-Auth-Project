import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import * as firebase from 'firebase'
import Expo from 'expo'
import * as Facebook from "expo-facebook";
import {firebaseConfig} from '../config'
import * as Google from 'expo-google-app-auth'
import { TouchableOpacity } from 'react-native-gesture-handler';

if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig)
  } catch (err) {
      console.error("Firebase initialization error raised", err.stack)
  }
}

export default class SignUpScreen extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errorMessage: null
    }
  }

  isUserEqual= (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


    onSignIn = async(googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            )
                // googleUser.getAuthResponse().id_token);
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(() => console.log('signed in'))
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
        } else {
            console.log('User already signed-in Firebase.');
        }
        }.bind(this));
    }

    signInWithGoogleAsync = async() => {
        
            // await Google.initializeAsync('980241211527-t0ks81kcoaqpuc40ngfjqpkodsbe31gn.apps.googleusercontent.com')
            const result = await Google.logInAsync({
            // androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '980241211527-t0ks81kcoaqpuc40ngfjqpkodsbe31gn.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
    
        if (result.type == 'success'){
            this.onSignIn(result)
            const credential = firebase.auth.GoogleAuthProvider.credential(token)

            firebase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error)
            })
        }
    }

  facebookLogIn = async() => {
    await Facebook.initializeAsync('227493178644063')
    const { type, token } = await Facebook.logInWithReadPermissionsAsync
    ('227493178644063', { permission: ['public_profile']})

    if (type == 'success'){
        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        firebase.auth().signInWithCredential(credential).catch((error) => {
            console.log(error)
        })
    }
}

  signUpUser = (email, password) => {
    //   if(this.state.password.length < 6){
    //     alert("The password must be at least 6 characters long")
    //     return
    //   }
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
          return userCredentials.user.updateProfile({
              displayame: this.state.name
          })
      })
      .catch((error) => {
          this.setState({
              errorMessage: error.message
          })
    })
  }


  render(){
    return (
      <View>
          <Text style={styles.greeting}>{`Hi! \n Sign up to get started!`}</Text>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>

          <View style={styles.form}>
              <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    autoCapicalize="none"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                  ></TextInput>
              </View>

              <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    autoCapicalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  ></TextInput>
              </View>

              <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    autoCapicalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  ></TextInput>
              </View>

          </View>
          <TouchableOpacity style={styles.button} onPress={this.signUpUser}>
              <Text style={{fontFamily:"Arial", fontWeight: "bold"}}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleBtn} 
                onPress={() => this.signInWithGoogleAsync()}>
              <Text style={{color: "white",  fontFamily:"Arial", fontWeight: "bold"}}>Sign Up With Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookBtn} 
                onPress={() => this.facebookLogIn()}>
              <Text style={{color: "white", fontFamily:"Arial", fontWeight: "bold"}}>Sign Up With Facebook</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("LogIn")}>
                <Text style={{ color: "#414959", fontSize: 13, }}>
                    Already have LogIn? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Log In</Text>
                </Text>
            </TouchableOpacity>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  greeting: {
      marginTop: 32,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center"
  },
  errorMessage: {
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30   
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
},
  form: {
      marginBottom: 40,
      marginHorizontal: 30
  },
  inputTitle: {
      color: "#8A8F9E",
      fontSize: 16,
      textTransform: "uppercase"
  },
  input: {
      borderBottomColor: "#8A8F9E",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      color: "#161F3D"
  },
  button: {
      marginHorizontal: 30,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#ffaa22",
      backgroundColor: "#ffec64",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center"
  },
  facebookBtn: {
      marginTop: 10, 
      borderWidth: 1,
      borderColor: "#314179",
      marginHorizontal: 30,
      backgroundColor: "#3b5998",
      borderRadius: 4,
      height: 52,
      alignItems: "center", 
      justifyContent: "center"
  }, 
  googleBtn: {
      marginTop: 10,
      marginHorizontal: 30,
      borderWidth: 1,
      borderColor: "#942911",
      backgroundColor: "#E74B37",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center"
  }
});