import React, { useState, useLayoutEffect, useEffect } from 'react'
import { TouchableOpacity, SafeAreaView, Platform, Keyboard, StatusBar, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const ChatUserScreen = ({navigation, route}) => {

    const [input, setInput] = useState('');
    let currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [messages, setMessages] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');
    const db = firebase.firestore();
    const email = firebase.auth().currentUser.email;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: '#009387'},
            headerTitle: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>                
                <Text style={{color: 'white', marginLeft: -22, fontWeight: '700'}}>
                    {route.params.chatName}
                </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                    <FontAwesome
                    name='chevron-left'
                    color="white"
                    size={23} 
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 60, marginRight: 20,}}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name='phone' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    useEffect(() => {
        async function getUserInfo(){
          let doc = await firebase.firestore().collection('users').doc(currentUserUID).get();
          if (!doc.exists){
            Alert.alert('No user data found!')
          } else {
            let dataObj = doc.data();
            setFirstName(dataObj.firstName)
            setPhotoUrl(dataObj.photoUrl)
          }
        };
        getUserInfo();
      });

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("users").doc(route.params.id).collection("messages").doc(currentUserUID).collection('chat').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            firstName: firstName,
            email: email,
            photoUrl: photoUrl,
        });

        db.collection("users").doc(currentUserUID).collection("messages").doc(route.params.id).collection('chat').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            firstName: firstName,
            email: email,
            photoUrl: photoUrl,
        });

        setInput('');
    };

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('users')
        .doc(route.params.id)
        .collection('messages')
        .doc(currentUserUID)
        .collection('chat')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => 
        setMessages(
            snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            }))
        ));
        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
           <StatusBar style='light' />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                    keyboardVerticalOffset={90}>
            
                        <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}> 
                        {messages.map(({ id, data }) => (
                            data.email === email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                    position="absolute"
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        right: -5
                                    }}
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{uri: data.photoUrl,}}/>
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                    position="absolute"
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: -5
                                    }}
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    source={{uri: data.photoUrl,}}/>
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.firstName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        placeholder='Type your message..'
                        onSubmitEditing={sendMessage}
                        style={styles.textInput} />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name='send' size={24} color="#009387" />
                        </TouchableOpacity>
                    </View>
                    </>
                    
                </KeyboardAvoidingView>
       </SafeAreaView>
    )
}

export default ChatUserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    }, 
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 25,
        backgroundColor: '#ececec',
        padding: 10,
        color: 'black',
        borderRadius: 30,
    }, 
    reciever: {
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    }, 
    sender: {
        padding: 15,
        backgroundColor: "#00D2C1",
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative',
    }, 
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    }, 
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    }, 
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
    }
})
