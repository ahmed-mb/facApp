
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, Alert, SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import {loggingOut} from '../API/firebaseMethods';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';


const Top = createMaterialTopTabNavigator();

export default function Dashboard({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      let doc = await firebase
      .firestore()
      .collection('users')
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName)
      }
    }
    getUserInfo();
  })

  const handlePress = () => {
    loggingOut();
    navigation.replace('Home');
  };

  const Projects = () => {
    return (
    <View style={styles.projectStyle}>
        <Text >Projects List</Text>
      </View>
    )
  }

  const Chats = () => {
    return (
    <View style={styles.projectStyle}>
        <Text >Chat List</Text>
      </View>
    )
  }

  const NewProject = () => {
    return (
    <View style={styles.projectStyle}>
        <Text >New Project</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.text1}>
          <Text style={styles.text}>Hi {firstName}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handlePress}>
            <Feather
              name='log-out'
              color='white'
              style={styles.signOut}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
          <Top.Navigator initialRouteName="Projects" 
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        activeTintColor: '#fff',
        indicatorStyle: { backgroundColor: '#fff'},
        style: { backgroundColor: '#009387' },
      }}>
            <Top.Screen name="New Project" component={NewProject}/>
            <Top.Screen name="Projects" component={Projects} />
            <Top.Screen name="Chats" component={Chats} />
          </Top.Navigator>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    button: {
      width: 150,
      padding: 5,
      backgroundColor: '#000000',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 15,
    },
    signOut: {
      text: 'right',
      fontSize: 25,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: 'white',
      paddingRight: 10,
      paddingTop: 15
    },
    container: {
      height: '100%',
      width: '100%',
    },
    projectStyle: {
      flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    text: {
      fontSize: 25,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: 'white',
      marginLeft: '3%'
    }, 
    text1: {
      flex: 1,
      paddingTop: '3%'
    },
    header: {
      flex: 0.1,
      flexDirection: 'row',
      backgroundColor: '#009387',
    },
    footer: {
      flex: 1,
    },
    titleText: {
      fontSize: 30,
    },
    nav: {
      backgroundColor: '#009387',
      color: '#009387'
      }
  });