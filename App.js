
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LoadingScreen from './screens/LoadingScreen';
import Dashboard from './screens/Dashboard';
import ChatScreen from './screens/ChatScreen';
import AddProject from './screens/AddProject';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/Profile';
import ChatList from './screens/ChatList';
import {FontAwesome5} from '@expo/vector-icons';
import Home from './screens/Home';
import FlashMessage from "react-native-flash-message";
import { View } from 'react-native-animatable';
import EditProfile from './screens/EditProfile';
import ChatUserScreen from './screens/ChatUserScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  function Tabs() {
    return (
      <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName='Projects'
        tabBarOptions={{activeTintColor: '#009387', showLabel: false}}>
        <Tab.Screen name='Projects' component={Dashboard} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="list-alt" color={color} size={size} />
            ),}}/>
        <Tab.Screen name='ChatList' component={ChatList} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="comments" color={color} size={size} />
            ),}}/>
        <Tab.Screen name='Add Project' component={AddProject}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="plus" color={color} size={size} />
            ),}}/>
        <Tab.Screen name='Home' component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),}}/>
        <Tab.Screen name='Profile' component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" color={color} size={size} />
            ),}}/>
      </Tab.Navigator>
      <FlashMessage position="top" /> 
      </View>
    )
  }

  function Log() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Loading' component={LoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Sign In' component={SignIn} options={{headerShown: false}} />
        <Stack.Screen name='Sign Up' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name='Dashboard' component={Tabs} options={{headerShown: false}}/>
        <Stack.Screen name='Chat' component={ChatScreen}/>
        <Stack.Screen name='Chat User' component={ChatUserScreen}/>
        <Stack.Screen name='Edit Profile' component={EditProfile}/>
        </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
     <Log />
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create ({

})