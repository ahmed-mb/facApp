import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ImageBackground } from 'react-native'
import Header from '../components/Header'
import {LinearGradient} from 'expo-linear-gradient'
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  let currentUserUID = firebase.auth().currentUser.uid;

  const getUser = async() => {
    await firebase.firestore()
    .collection('users')
    .doc(currentUserUID)
    .onSnapshot((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);

    return (
        <SafeAreaView>
      <View style={styles.container}>
      <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} style={styles.container2}>
            <View>
        <Header/>
        </View>
        <View style={styles.list}>
        <ImageBackground source={{uri: userData ? userData.photoUrl : ''}} style={{height: 100, width: 100}} imageStyle={{borderRadius: 50}}/>
        <Text style={{color: 'black', fontSize: 23, fontWeight: 'bold', margin: '1%'}}>{userData ? userData.firstName : 'nothing'}</Text>
        <View style={styles.viewInfo}>
          <Icon name="email" color='#777777' size={18}/>
        <Text style={{color: '#777777', fontSize: 15, paddingLeft: 10}}>{userData ? userData.email : 'No Email'}</Text>
        </View>
        <View style={styles.viewInfo}>
        <Icon name="phone" color='#777777' size={18}/>
        <Text style={{color: '#777777', fontSize: 15, paddingLeft: 10}}>{userData ? userData.phoneNo : 'No Phone No'}</Text>
        </View>
        <View style={{borderTopColor: '#dddddd',borderTopWidth: 2, margin: '2%', flexDirection: 'row', width: '50%'}}/>
        <View style={styles.viewInfo}>
        <Icon name="account-edit-outline" color='rgba(0,147,135,1)' size={20} />
        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        </View>
            </View>
            </LinearGradient>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
      },
      container2: {
        height: '40%'
      },
      list: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: -100,
        borderRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 24,
        shadowColor: 'black',
        shadowOpacity: 0.48,
        shadowRadius: 11.95
      },
      buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#777777',
        paddingLeft: 10
      },
      viewInfo: {
        flexDirection: 'row', 
        margin: '1%', 
        alignSelf: 'flex-start', 
        paddingLeft: '28%'
      }
})
