import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Header from '../components/Header';
import {LinearGradient} from 'expo-linear-gradient'

const Home = ({navigation}) => {
    return (
        <SafeAreaView>
      <View style={styles.container}>
      <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} style={styles.container2}>
        <View style={{marginBottom: 200 }}>
            <View>
        <Header/>
        </View>
        <View style={styles.list}>
            <Text>Nothing yet!</Text>
        </View>
        </View>
        </LinearGradient>
        </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
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
        marginVertical: 4,
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginTop: 10,
        shadowColor: 'black',
        shadowOpacity: 0.48,
        shadowRadius: 11.95
      }
})
