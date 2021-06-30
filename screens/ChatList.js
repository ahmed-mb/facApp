import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import Header from '../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {LinearGradient} from 'expo-linear-gradient'
import CustomListUserItems from '../components/CustomListUserItems';

const Top = createMaterialTopTabNavigator();

const ChatList = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const db = firebase.firestore();

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
          setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })))
        ))
      }, [])

    useEffect(() => {
      const users = db.collection('users').onSnapshot(snapshot => (
        setUsers(snapshot.docs.map(doc => ({
          id: doc.id,
          data1: doc.data(),
          data2: doc.data(),
        })))
      ))
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
          id,
          chatName,
        })
      }

      const enterUserChat = (id, chatName) => {
        navigation.navigate('Chat User', {
          id,
          chatName,
        })
      }

    const Groups = () => {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
            {chats.map(({ id, data: { chatName } }) => (
              <CustomListItem key={id} id={id} chatName={ chatName } enterChat={enterChat}/>
            ))}
          </ScrollView>
        )
      }

    const Chats = () => {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
            {users.map(({ id, data1: {firstName}, data2: {photoUrl} }) => (
              <CustomListUserItems key={id} id={id} chatName={ firstName } photoUrl={ photoUrl } enterChat={enterUserChat}/>
            ))}
          </ScrollView>
        )
      }

    return (
        <SafeAreaView>
                <View style={styles.container}>
      <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} style={styles.container2}>
            <View>
        <Header/>
        </View>
        </LinearGradient>
        <View style={styles.list}>
        <Top.Navigator initialRouteName="Chats"
            tabBarOptions={{
              labelStyle: { fontSize: 12, fontWeight: 'bold' },
              activeTintColor: '#000',
              indicatorStyle: { backgroundColor: '#000'}
            }}>
            <Top.Screen name="Chats" component={Chats} />
            <Top.Screen name="Groups" component={Groups} />
          </Top.Navigator>
      </View>
      </View>
      </SafeAreaView>
    )
}

export default ChatList

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%'
    },
    container2: {
      height: '40%'
    },
    list: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      marginHorizontal: 16,
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 24,
      marginTop: '-30%',
      marginBottom: '3%',
      shadowColor: 'black',
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
    }
})
