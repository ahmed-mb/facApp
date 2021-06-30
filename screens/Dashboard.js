import React, { useEffect, useState } from 'react';
import { View, BackHandler, StyleSheet, SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListProject from '../components/CustomListProject';
import Header from '../components/Header'
import { LinearGradient } from 'expo-linear-gradient';
import CustomListProjectHistory from '../components/CustomListProjectHistory';

const Top = createMaterialTopTabNavigator();

export default function Dashboard({ navigation }) {
  const [projectList, setProjectList] = useState([]);
  const [projectListHistory, setProjectListHistory] = useState([]);
  const db = firebase.firestore();
  let currentUserUID = firebase.auth().currentUser.uid;

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
  
  useEffect(() => {
    const unsubscribe = db.collection('projects').doc(currentUserUID).collection('userprojects').onSnapshot(snapshot => (
      setProjectList(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
        data2: doc.data(),
        data3: doc.data()
      })))
    ))
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('projects').doc(currentUserUID).collection('userprojectshistory').onSnapshot(snapshot => (
      setProjectListHistory(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
        data2: doc.data(),
        data3: doc.data()
      })))
    ))
  }, [])

  const Projects = () => {
    return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {projectList.map(({ id, data: { projectName }, data2: {projectDetails}, data3: {photoUrl} }) => (
         <CustomListProject key={id} id={id} projectName={ projectName } projectDetails={projectDetails} photoUrl={photoUrl} />
      ))}
    </ScrollView>
    )
  }

  const History = () => {
    return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {projectListHistory.map(({ id, data: { projectName }, data2: {projectDetails}, data3: {photoUrl} }) => (
         <CustomListProjectHistory key={id} id={id} projectName={ projectName } projectDetails={projectDetails} photoUrl={photoUrl} />
      ))}
    </ScrollView>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(0,147,135,1)']} style={styles.container2}>
            <View>
        <Header/>
        </View>
      </LinearGradient>    
      <View style={styles.list}>
          <Top.Navigator initialRouteName="Projects" 
            tabBarOptions={{
              labelStyle: { fontSize: 12, fontWeight: 'bold' },
              activeTintColor: '#000',
              indicatorStyle: { backgroundColor: '#000'},
            }}>
            <Top.Screen name="Projects" component={Projects} />
            <Top.Screen name="History" component={History} />
          </Top.Navigator>
          </View>
      </View>
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%'
    },
    container2: {
      height: '40%',
    },
    list: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      marginHorizontal: 16,
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 24,
      marginTop: '-30%',
      marginBottom: '3%',
      shadowColor: 'black',
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
    },
    backTextWhite: {
      color: '#fff'
    },
    rowFront: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 60,
      margin: 5,
      marginBottom: 15,
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5
    },
    rowFrontVisible: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 60,
      padding: 10,
      marginBottom: 15,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#ddd',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5
    },
    backRightBtn: {
      alignItems: 'flex-end',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      paddingRight: 17
    },
    backRightBtnLeft: {
      backgroundColor: '#1f65ff',
      right: 75
    },
    backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5
    },
    trash: {
      height: 25,
      width: 25,
      marginRight: 7
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#666'
    },
    details: {
      fontSize: 12,
      color: '#999'
    }
  });