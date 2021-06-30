import firebase from 'firebase';
import React, { useEffect } from 'react'
import { StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListProject = ({ id, projectName, projectDetails, photoUrl }) => {
    const db = firebase.firestore();
    let currentUserUID = firebase.auth().currentUser.uid;

    useEffect(() => {
        getProjects();
    }, []);

    const createProject = async () => {
        await db.collection('projects').doc(currentUserUID).collection('userprojectshistory').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          projectName,
          projectDetails,
          photoUrl,
        }).catch((error) => alert(error));
    };

    const deleteProject = async () => {
        await db.collection('projects').doc(currentUserUID).collection('userprojects').doc(id).delete()
        .then(() => {
            console.log('User deleted!');
        });
    };

    const handlepress = async () => {
        createProject();
        deleteProject();
    }

    return (
        <ListItem key={id} bottomDivider>
        <TouchableOpacity style={styles.projectlist} onLongPress={() => { Alert.alert(
          "Delete!",
          "Are you sure you want to delete the project?",
          [
            {
              text: "NO",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Yes", onPress: (handlepress) }
          ]
        )}} delayLongPress={500}>
            <Avatar rounded source={{uri: photoUrl}}/>
            <ListItem.Content style={{paddingLeft: 15}}>
                <ListItem.Title style={{ fontWeight: "700"}}>
                    {projectName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {projectDetails}
                </ListItem.Subtitle>
            </ListItem.Content>
        </TouchableOpacity>
        </ListItem>
    )
}

export default CustomListProject

const styles = StyleSheet.create({
    projectlist: {
        flexDirection: 'row',
    }
})
