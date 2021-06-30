
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('Sign In');
        }
      });
    }
  );

  return (
    <View style={styles.container}>
    <Animatable.View 
                animation="fadeIn">
      <ActivityIndicator size='large' color='#009387' />
    </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });