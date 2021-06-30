import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import Header from '../components/Header'
import {LinearGradient} from 'expo-linear-gradient'
import {showMessage} from 'react-native-flash-message'

const AddProject = ({ navigation }) => {
    let currentUserUID = firebase.auth().currentUser.uid;
    const [input, setInput] = useState('');
    const [inputDetails, setInputDetails] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const db = firebase.firestore();

    useEffect(() => {
        async function getUserInfo(){
          let doc = await firebase.firestore().collection('users').doc(currentUserUID).get();
          if (!doc.exists){
            Alert.alert('No user data found!')
          } else {
            let dataObj = doc.data();
            setPhotoUrl(dataObj.photoUrl || 'https://img.icons8.com/ios/50/000000/administrator-male--v1.png')
          }
        };
        getUserInfo();
      });
    
    const createProject = async () => {
        await db.collection('projects').doc(currentUserUID).collection('userprojects').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          projectName: input,
          projectDetails: inputDetails,
          photoUrl: photoUrl,
        }).catch((error) => alert(error));
        };

    const handlePress = () => {
        showMessage({
          message: "Project Added",
          description: "A Project added seccussfully!!",
          type: "success",
        });
        createProject();
        };

    return (
      <SafeAreaView>
      <View style={styles.container}>
      <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} style={styles.container2}>
        <View>
          <View>
            <Header/>
        </View>
        <View style={styles.list}>
        <View style={styles.addProjectStyle}>
        <Text style={styles.header_text}>Add New Project</Text>
        <View style={styles.action}>
          <TextInput
          style={styles.textInput}
          placeholder="Add Project Name"
          defaultValue={input}
          onChangeText={(text) => setInput(text)}
          />
        </View>
  
        <View style={styles.action}>
          <TextInput
          style={styles.textInput}
          placeholder="Add Project Details"
          value={inputDetails}
          onChangeText={(text) => setInputDetails(text)}
          />
        </View>
        <TouchableOpacity >
            <Text style={styles.buttonText1} onPress={handlePress}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
      </LinearGradient>
      </View>
      </SafeAreaView>
    )
}

export default AddProject

const styles = StyleSheet.create({
    addProjectStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        
      },
      textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a'
      },
      action: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        fontSize: 17,
        borderWidth: 2,
        borderColor:'#a4eddf',
        borderRadius: 30,
        padding: 7,
        margin: '2%',
        backgroundColor: 'white'
      },
      header_text: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        paddingBottom: 20
      },
      buttonText1: {
        width: '40%',
        padding: 7,
        margin: '3%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'rgba(0,147,135,1)',
        borderRadius: 30,
      },
      container: {
        height: '100%',
        width: '100%'
      },
      container2: {
        height: '40%'
      },
      list: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginHorizontal: 16,
        borderRadius: 15,
        paddingHorizontal: 24,
        shadowColor: 'black',
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        marginTop: '-48%',
        padding: '6%'
      }
})
