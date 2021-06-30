import firebase from 'firebase';
import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListProjectHistory = ({ id, projectName, projectDetails, photoUrl }) => {

    return (
        <ListItem key={id} bottomDivider>
            <Avatar rounded source={{uri: photoUrl}}/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "700"}}>
                    {projectName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {projectDetails}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListProjectHistory

const styles = StyleSheet.create({
})
