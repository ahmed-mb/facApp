import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard ,StyleSheet, SafeAreaView, Button} from 'react-native';
import { registration } from '../API/firebaseMethods';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';


export default function SignUp({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const emptyState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handlePress = () => {
        if (!firstName) {
        Alert.alert('First name is required');
        } else if (!email) {
        Alert.alert('Email field is required.');
        } else if (!password) {
        Alert.alert('Password field is required.');
        } else if (!confirmPassword) {
        setPassword('');
        Alert.alert('Confirm password field is required.');
        } else if (password !== confirmPassword) {
        Alert.alert('Password does not match!');
        } else {
        registration(
            email,
            password,
            lastName,
            firstName,
        );
        navigation.navigate('Loading');
        emptyState();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>Create an account</Text>
            </View>

            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer} 
                >
                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="First name*"
                    value={firstName}
                    onChangeText={(name) => setFirstName(name)}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(name) => setLastName(name)}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='envelope'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email*"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='lock'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password*"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome
                    name='check'
                    color="#05375a"
                    size={20} 
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Retype your password to confirm*"
                    value={confirmPassword}
                    onChangeText={(password2) => setConfirmPassword(password2)}
                    secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={[styles.button, {marginTop: 10}]} onPress={handlePress}>
                    <Text style={styles.buttonText1}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.inlineText}>Already have an account?</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

            </Animatable.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: '25%',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
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