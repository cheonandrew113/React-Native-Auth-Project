import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {createSwitchNavigator} from 'react-navigation'
import * as firebase from 'firebase'


export default class HomeScreen extends React.Component{
  
    state= {
        email: "",
        displayName: "",
        photoURL: ""
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                console.log(user)
            }
        })
    }

    photoURL = () => {
        firebase.auth().currentUser.photoURL
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={{  fontSize: 20
                }}>Hi {firebase.auth().currentUser.displayName}!</Text>
                <Image  style={styles.image} source={{url: firebase.auth().currentUser.photoURL}}/>
                <TouchableOpacity style={{  marginTop: 10, marginHorizontal: 30,
                backgroundColor: "#BDB76B",
                borderRadius: 4,
                marginTop: 100,
                height: 52,
                width: 172,
                alignItems: "center", 
                justifyContent: "center"}} onPress={this.signOutUser}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>

        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      borderRadius: 50,
      marginTop: 50,
      width: 100,
      height: 100
  }
});
