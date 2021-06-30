import firebase from 'firebase';
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListUserItems = ({ id, chatName, enterChat, photoUrl }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const db = firebase.firestore();
    let currentUserUID = firebase.auth().currentUser.uid;

    useEffect(() => {
        const unsubscribe = db
        .collection('users')
        .doc(id)
        .collection('messages')
        .doc(currentUserUID)
        .collection('chat')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    });

    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded source={{uri: photoUrl || 'https://img.icons8.com/small/96/000000/user-male-circle.png'}}/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "700"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.firstName} : {chatMessages?.[0]?.message || 'NO MESSAGES!'}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListUserItems

const styles = StyleSheet.create({})
