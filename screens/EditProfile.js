import React, {useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, SafeAreaView, Platform, ImageBackground, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesome } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native'

const EditProfile = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const phoneRef = useRef(undefined);
    let currentUserUID = firebase.auth().currentUser.uid;

    const handlePress = () => {
        var user = firebase.auth().currentUser;
        user.updateEmail(userData.email);
        firebase.firestore()
        .collection('users')
        .doc(currentUserUID)
        .update({
            email: userData.email,
            lastName: userData.lastName,
            firstName: userData.firstName,
            phoneNo: userData.phoneNo,
            photoUrl: userData.photoUrl
        })
        .then(() => {
            console.log('User Updated!');
            Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.'
            )
            navigation.goBack('Profile');
        })
    };

    const getUser = async() => {
    await firebase.firestore()
    .collection('users')
    .doc(currentUserUID)
    .get()
    .then((documentSnapshot) => {
        if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
        }
    })
    }

    useEffect(() => {
    getUser();
    }, []);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            uploadImage(result.uri); 
            setUserData({... userData, photoUrl: result.uri})
        }
      };

      uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(currentUserUID);
        return ref.put(blob);
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => {}}>
                    <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageBackground source={{uri: userData ? userData.photoUrl : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffavpng.com%2Fpng_view%2Fuser-profile-user-profile-avatar-png%2FYeVhHTwy&psig=AOvVaw33q6WOhw8D4IwkEdw0CJXn&ust=1622331774364000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNiKtYrH7fACFQAAAAAdAAAAABAD'}} style={{height: 100, width: 100}} imageStyle={{borderRadius: 50}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name='camera' size={35} color='#fff' onPress={pickImage} style={{
                                    opacity: 0.8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: '#fff',
                                    borderRadius: 10
                                }} />
                            </View>
                        </ImageBackground>
            </View>
            </TouchableOpacity>
            <View style={[styles.action,{marginTop: 20}]}>
                    <FontAwesome
                    name='user-o'
                    color="#777777"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder= {userData ? userData.firstName : ''}
                    value={userData ? userData.firstName : ''}
                    onChangeText={(txt) => setUserData({... userData, firstName: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color="#777777"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder= {userData ? userData.lastName : ''}
                    value={userData ? userData.lastName : ''}
                    onChangeText={(txt) => setUserData({... userData, lastName: txt})}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='envelope'
                    color="#777777"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder= {userData ? userData.email : ''}
                    value={userData ? userData.email : ''}
                    onChangeText={(txt) => setUserData({... userData, email: txt})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </View>

                <View style={styles.action1}>
                    <PhoneInput 
                    placeholder={userData ? userData.phoneNo : ''}
                    ref={phoneRef}
                    value={userData ? userData.phoneNo : ''}
                    onChangePhoneNumber={(txt) => setUserData({... userData, phoneNo: txt})} 
                    />
                </View>
                
                <View style={{width: '50%', marginTop: 5}}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
            </KeyboardAwareScrollView>
            </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    content: {
        flex: 1
    }, 
    view: {
        alignItems: 'center',
        padding: 24,
        justifyContent: "space-around"
    },
    buttonText: {
        width: '100%',
        padding: 7,
        margin: '3%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#777777',
        borderRadius: 30,
    },
    action: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        fontSize: 17,
        borderWidth: 2,
        borderColor:'#777777',
        borderRadius: 30,
        padding: 7,
        margin: '2%',
    },
    action1: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor:'#777777',
        borderRadius: 30,
        padding: 9,
        margin: '2%',
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#777777'
    }
})
