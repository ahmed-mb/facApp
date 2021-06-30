
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, BackHandler, Text, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {signIn} from '../API/firebaseMethods';
import { FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

export default function SignIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const backAction = () => {
          [
            {
              onPress: () => null,
            }
          ];
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    const handlePress = () => {
        if (!email) {
        Alert.alert('Email field is required.');
        }
        else if (!password) {
        Alert.alert('Password field is required.');
        }
        else {
        signIn(email, password);
        setEmail('');
        setPassword('');
        navigation.navigate('Loading');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']}>
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
                        keyboardType="email-address"
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
                        secureTextEntry
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
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: '20%',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        height: '100%',
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
        backgroundColor: 'rgba(34,193,195,1)',
        borderRadius: 20,
    },
    buttonText1: {
        width: '80%',
        padding: 7,
        paddingRight: 10,
        margin: '2%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: 'rgba(34,193,195,1)',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: 'rgba(34,193,195,1)',
        borderWidth: 2,
    },
    container: {
        height: '100%'
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
        fontSize: 15,
        paddingLeft: 45,
        margin: '1%'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a'
    },
  });