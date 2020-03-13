import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import * as firebase from 'firebase'
import Expo from 'expo'
import {firebaseConfig} from '../config'
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
              <Text>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ 
                marginTop: 10, marginHorizontal: 30,
                backgroundColor: "grey",
                borderRadius: 4,
                height: 52,
                alignItems: "center", 
                justifyContent: "center"}} 
                onPress={() => alert("pressed")}>
              <Text>Sign Up with Google</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("HomeScreen")}>
                <Text style={{ color: "#414959", fontSize: 13}}>
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
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center"
  }
});