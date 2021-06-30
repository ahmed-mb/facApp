import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView} from 'react-native';
import * as firebase from 'firebase'
import {loggingOut} from '../API/firebaseMethods';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'react-native';
import 'firebase/firestore'
import 'firebase/auth'

const Header = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    let currentUserUID = firebase.auth().currentUser.uid;

    useEffect(() => {
        async function getUserInfo(){
          let doc = await firebase.firestore().collection('users').doc(currentUserUID).get();
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
      };
      
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light'/>
      <View style={styles.header}>
        <View style={styles.text1}>
          <Text style={styles.text}>Hi {firstName}</Text>
          <View >
          <TouchableOpacity style={styles.icons}>
              <Feather
              name='log-out'
              color='white'
              style={styles.signOut}
              onPress={handlePress}
            />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    signOut: {
        fontSize: 28,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 4,
        paddingRight: 10
      },
      container: {
        height: '100%',
        width: '100%',
      },
      text: {
        fontSize: 28,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '5%'
      }, 
      text1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingBottom: '3%'
      },
      icons: {
        flexDirection: 'row',
        paddingRight: 10
      },
      header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
      },
})
