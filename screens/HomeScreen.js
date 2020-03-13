import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createSwitchNavigator} from 'react-navigation'
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component{
  
    state= {
        email: "",
        displayName: ""
    }

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser

        this.setState({ email, displayName })
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}</Text>
            
                <TouchableOpacity style={{ marginTop: 32}} onPress={this.signOutUser}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
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
