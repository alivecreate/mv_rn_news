import * as React from 'react';
import { Component, useState, useContext, useEffect } from 'react'

import { Button, View, StatusBar, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './DrawerContent'
import HomeScreen from '../Home/HomeScreen'
import PostListScreen from '../Posts/PostListScreen'
import PostDetailScreen from '../Posts/PostDetailScreen'
import CreateBulletin from '../Bulletin/CreateBulletin'
import CreatePressnote from '../Pressnote/CreatePressnote'

import BulletinListScreen from '../Bulletin/BulletinListScreen'
import EditBulletin from '../Bulletin/EditBulletin'
import SplashScreen from '../Splash/SplashScreen';
import TestPushNotification from '../Services/TestPushNotification';

// import Login from '../Auth/Login';
import PostContext from '../Data/PostContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GLOBAL from "../Global";
import {PostProvider} from '../Data/PostContext';

import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const NavigationDrawer = (props) => {

  const { getLoginKey, loginData, setLoginData, signOut } = useContext(PostContext);

  // const { notifyMessage } = useContext(PostContext);

  const [isVisible,setIsVisible ] = useState(false);

  // const { notifyMessage } = useContext(PostContext);
    

//   const Hide_Splash_Screen=()=>{     
//     setIsVisible(false);   
// }  

  useEffect(() => {
    
    setTimeout(()=>{ 
      setIsVisible(true);  
      

    },4000);
    
//   async function getLoginKey(){

//     alert('test login');
//     let loginData = await AsyncStorage.getItem('loginData');  
//     let getLoginData = JSON.parse(loginData);  
//     if(getLoginData !== null){
//       setLoginData(getLoginData);
//       alert('test'+JSON.stringify(getLoginData));
//     }else{
//       alert('null');
//     }
// }

// getLoginKey();

// setTimeout(()=>{
//   getLoginKey();
// },2000);
}, [])


return(
    <>
    <NavigationContainer
    

    >
      <Drawer.Navigator initialRouteName="Home" 
          drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen label="Help" name="CreateBulletin" component={CreateBulletin} />
        <Drawer.Screen label="Help" name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen label="Help" name="BulletinListScreen" component={BulletinListScreen} />
        <Drawer.Screen label="Help" name="PostListScreen" component={PostListScreen} />
        <Drawer.Screen label="Help" name="PostDetailScreen" component={PostDetailScreen} />
        <Drawer.Screen label="Help" name="EditBulletin" component={EditBulletin} />
        <Drawer.Screen label="Help" name="CreateBulletin" component={CreateBulletin} />
        <Drawer.Screen label="Help" name="CreatePressnote" component={CreatePressnote} />

        <Drawer.Screen label="Help" name="TestPushNotification" component={TestPushNotification} />

        
        
        
      </Drawer.Navigator>
    </NavigationContainer>
    </>  
    
)
}

export default NavigationDrawer;