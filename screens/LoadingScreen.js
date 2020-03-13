import React from 'react';
import {StyleSheet, Text, View, TextInput, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase'


export default class LoadingScreen extends React.Component {
  
    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("App")
            } else {
                this.props.navigation.navigate("Auth")
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
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
