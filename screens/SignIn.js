
import React, { useState } from 'react';
import { View, TouchableOpacity, Button, Text, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {signIn} from '../API/firebaseMethods';
import { FontAwesome } from '@expo/vector-icons';


export default function SignIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        if (!email) {
        Alert.alert('Email field is required.');
        }

        if (!password) {
        Alert.alert('Password field is required.');
        }

        signIn(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>WELCOME!</Text>
            </View>

            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}>

                <Text style={styles.inlineText}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                    />
                </View>

                <Text style={styles.inlineText}>Password</Text>
                <View style={[styles.action, {marginBottom: 20}]}>
                    <FontAwesome
                    name='lock'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your password"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                <TouchableOpacity onPress={handlePress} >
                    <Text style={styles.buttonText1}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.inlineText}>Don't have an account?</Text>
                
                <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>

            </Animatable.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    buttonText: {
        width: '80%',
        padding: 7,
        margin: '2%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#009387',
        borderRadius: 30,
    },
    buttonText1: {
        width: '80%',
        padding: 7,
        margin: '2%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#009387',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderColor: '#009387',
        borderWidth: 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
    },
    header_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 23,
        marginLeft: 10
    },
    inlineText: {
        color: '#000',
        fontWeight: 'bold',
        fontSizeP: 30,
        paddingLeft: 20,
        margin: '1%'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a'
    }
  });