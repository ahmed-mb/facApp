import {ImageBackground, StyleSheet, View, Text, Button} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen ({navigation}) {
  return (
      <View>
      <Button style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
        <Text style={styles.buttonText}>Sign Up</Text>
       </Button>
      <Text style={styles.inlineText}>Already have an account?</Text>
      <Button style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Button>
      </View>
  )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 200,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: 'white',
      backgroundColor: '#000000',
      padding: 5,
      margin: '2%'
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'navy',
      textAlign: 'center'
    },
    inlineText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'navy',
      textAlign: 'center',
      marginTop: '5%',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
    titleContainer: {
      position: 'absolute',
      top: 170,
    },
  });