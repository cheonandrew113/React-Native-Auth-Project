import React from 'react';
import {createSwitchNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Container, Content, Header, Form, Item, Button, Label} from 'native-base'
import Expo from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {firebaseConfig} from '../config'

if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig)
  } catch (err) {
      console.error("Firebase initialization error raised", err.stack)
  }
}

export default class LoginScreen extends React.Component{
  
    state = {
        email: '',
        password: '',
        errorMessage: null
    }
  
  
    logInUser = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({
                errorMessage: error.message
            })
      })
    }
  
  
    render(){
      return (
        <View>
            <Text style={styles.greeting}>{`Hi! \n Welcome Back!`}</Text>
            <View style={styles.errorMessage}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
  
            <View style={styles.form}>
  
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
            <TouchableOpacity style={styles.button} onPress={this.logInUser}>
                <Text>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("SignUpScreen")}>
                <Text style={{ color: "#414959", fontSize: 13}}>
                    New to this App? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
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