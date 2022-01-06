import * as React from 'react';
import { Component, useState, useContext, useEffect } from 'react'

import { Button, View, StatusBar, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './components/Drawer/DrawerContent'
import HomeScreen from './components/Home/HomeScreen'

import PostListScreen from './components/Posts/PostListScreen'
import PostDetailScreen from './components/Posts/PostDetailScreen'
import CreateBulletin from './components/Bulletin/CreateBulletin'
import CreatePressnote from './components/Pressnote/CreatePressnote'
import PressnoteList from './components/Pressnote/PressnoteList'
import PressnoteDetail from './components/Pressnote/PressnoteDetail'
import EditPressnote from './components/Pressnote/EditPressnote'



import BulletinListScreen from './components/Bulletin/BulletinListScreen'
import EditBulletin from './components/Bulletin/EditBulletin'
import SplashScreen from './components/Splash/SplashScreen';
import Login from './components/Auth/Login';


import PostContext, {PostProvider} from './components/Data/PostContext';

const Drawer = createDrawerNavigator();



const App = () => {

  const [loginData,setLoginData ] = useState([]);

  const [isVisible,setIsVisible ] = useState(false);

  // const { notifyMessage } = useContext(PostContext);
    

//   const Hide_Splash_Screen=()=>{     
//     setIsVisible(false);   
// }  

  useEffect(() => {
    
    setTimeout(()=>{ 
      setIsVisible(true);  

    },1000);


    // return(setIsVisible(false));

    
  async function getLoginKey(){

    // let data = {  
    //     email: 'kk',  
    //     password: '11111',
    //     loginStatus: 'login'
    //   }

    //   AsyncStorage.setItem('loginData',JSON.stringify(data));  
    
    let loginData = await AsyncStorage.getItem('loginData');  
    let getLoginData = JSON.parse(loginData);  
    if(getLoginData !== null){
      setLoginData(getLoginData);
      alert(JSON.stringify(getLoginData));
    }else{
      alert('null');
      setLoginData([]);
    }
}

// alert('111');
}, [])


return(
  isVisible === false?
  (<SplashScreen/>):
  (
    
    <>
    <StatusBar backgroundColor ="tomato" barStyle="light-content"/>
    <PostProvider>
    {/* <NavigationDrawer/> */}



    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen" 
              drawerPosition="right"
              
          drawerContent={props => <DrawerContent {...props} 
          
          />}>
            
        <Drawer.Screen name="HomeScreen" component={HomeScreen} 
        options={{headerShown: false, hidden: true}}
        />
        
        <Drawer.Screen name="BulletinListScreen" component={BulletinListScreen} 
        options={{headerShown: false, hidden: true}}/>

        <Drawer.Screen name="PostListScreen" component={PostListScreen} 
        options={{headerShown: false, hidden: true}}
        />
        
        <Drawer.Screen name="PostDetailScreen" component={PostDetailScreen} 
        options={{headerShown: false, hidden: true}}
        />


        <Drawer.Screen name="EditBulletin" component={EditBulletin} 
        options={{headerShown: false, hidden: true}}/>

        <Drawer.Screen name="CreateBulletin" component={CreateBulletin} 
        options={{headerShown: false, hidden: true}}/>

        <Drawer.Screen name="CreatePressnote" component={CreatePressnote} 
        options={{headerShown: false, hidden: true}}/>

        <Drawer.Screen name="PressnoteList" component={PressnoteList} 
        options={{headerShown: false, hidden: true}}/>
       
        <Drawer.Screen name="PressnoteDetail" component={PressnoteDetail}
        options={{headerShown: false, hidden: true}}/>

        <Drawer.Screen name="EditPressnote" component={EditPressnote} 
        options={{headerShown: false, hidden: true}}/>
        
        
        <Drawer.Screen name="Login" component={Login} />
        

      </Drawer.Navigator>


    </NavigationContainer>
      </PostProvider>
    </>  
    )
  
  )



}

export default App;