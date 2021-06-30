import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity ,StyleSheet, SafeAreaView} from 'react-native';
import { registration } from '../API/firebaseMethods';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-input'
import {LinearGradient} from 'expo-linear-gradient';

export default function SignUp({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const phoneRef = useRef(undefined);

    const emptyState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setImageUrl('');
        setPhoneNo('');
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
        } else if (!phoneNo) {
        Alert.alert('Please enter your NO!');
        } else {
            registration(
                email,
                password,
                lastName,
                firstName,
                imageUrl,
                phoneNo,
                );
            navigation.navigate('Loading');
            emptyState();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} >
            <View style={styles.header}>
                <Text style={styles.header_text}>Create an account</Text>
            </View>      
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer} 
                >
                    <ScrollView>
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

                <View style={styles.action1}>
                    <PhoneInput
                    ref={phoneRef}
                    value={phoneNo}
                    onChangePhoneNumber={setPhoneNo} 
                    />
                </View>
                
                <Text style={{paddingLeft: 45, fontSize: 13}}>(*) Are required fields</Text>
                <TouchableOpacity style={[styles.button, {marginTop: 10}]} onPress={handlePress}>
                    <Text style={styles.buttonText1}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.inlineText}>Already have an account?</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                </ScrollView>
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
        paddingBottom: 50,
    },
    footer: {
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
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
        borderRadius: 30,
    },
    buttonText1: {
        width: '80%',
        padding: 7,
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
    action1: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor:'#a4eddf',
        borderRadius: 30,
        padding: 9,
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
    }
});