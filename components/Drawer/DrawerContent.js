import React,{Component, useEffect, useContext, useState} from 'react'
import  { useTheme, Avatar, Title, Caption, Paragraph, Text,
    TouchableRipple, Switch, 
    Drawer } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
    
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

// import { AuthContext } from '../context';



import PostContext from '../Data/PostContext';
import Global from '../Global';

const GLOBAL = require('../Global');

// import DetailsScreen from './DetailsScreen'
// import ExplorerScreen from './ExplorerScreen'
// import ProfileScreen from './ProfileScreen'
// import CategoryScreen from '../Category/CategoryScreen'



export function DrawerContent(props){
    // const navigation = useNavigation();
    const paperTheme = useTheme();
    
    const { checkLoginFn, loginData, setLoginData,getJsonData, signOut } = useContext(PostContext);

    useEffect(() =>{
        // checkLoginFn();
        // alert('test');
        // getLoginKey();
        // alert(JSON.stringify(loginData.loginUserData));
    }, []);


    return(
        loginData.loginStatus == 'login'?(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                            <Avatar.Image
                            source={ require('../../assets/mailvadodara-ic.png')}

                                // source = {{
                                //     uri:require('../../assets/no-img-xs.png')
                                // }}
                                size ={70}
                                />

                            <View style={{marginLeft:15,
                                flexDirection:'column', justifyContent:'center' }}>
                                <Title style={styles.title}>Admin Panel</Title>
                                <Caption style={[styles.caption,{fontSize:15}]}>{loginData.loginUserData.name}</Caption>
                            </View>    
                        </View>
                    
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.caption}>Email :</Paragraph>
                                <Caption style={styles.caption}>{loginData.loginUserData.email}</Caption>
                            </View>      
                        </View>
                        
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.caption}>Phone : </Paragraph>
                                <Caption style={styles.caption}>{loginData.loginUserData.phone}</Caption>
                            </View>      
                        </View>
                        
                    </View>
                </View>               

            <Drawer.Section style={styles.DrawerSection}>
                
                <DrawerItem
                        icon={({color, size}) =>( 
                                    <Icon name="home-outline"
                                    color={color}
                                    size={size}
                                     />
                                )} 
                        label="Dashboard"
                        onPress= {() => {props.navigation.navigate('HomeScreen')}}
                    />
                    
                    <DrawerItem
                            icon={({color, size}) =>( 
                                        <Ionicons name="ios-create-outline"
                                        color={color}
                                        size={size}
                                         />
                                    )} 
                            label="Write Bulletin"
                            onPress= {() => {props.navigation.navigate('CreateBulletin')}}
                        />

                        
                    <DrawerItem
                            icon={({color, size}) =>( 
                                        <Ionicons name="ios-create-outline"
                                        color={color}
                                        size={size}
                                         />
                                    )} 
                            label="Write Pressnote"
                            onPress= {() => {props.navigation.navigate('CreatePressnote')}}
                        />

                        
                        <DrawerItem
                                icon={({color, size}) =>( 
                                            <Ionicons name="ios-images-outline"
                                            color={color}
                                            size={size}
                                             />
                                        )} 
                                label="All Buletins"
                                onPress= {() => {props.navigation.navigate('BulletinListScreen')}}
                            />
                            
                            <DrawerItem
                                    icon={({color, size}) =>( 
                                                <Ionicons name="book-outline"
                                                color={color}
                                                size={size}
                                                 />
                                            )} 
                                    label="All Pressnotes"
                                    onPress= {() => {props.navigation.navigate('PressnoteList')}}
                                />
                            
                            <DrawerItem
                                    icon={({color, size}) =>( 
                                                <Ionicons name="ios-newspaper-outline"
                                                color={color}
                                                size={size}
                                                 />
                                            )} 
                                    label="All News"
                                    onPress= {() => {props.navigation.navigate('PostListScreen')}}
                                />

                            
                            



                                 
{/*                             
                            <DrawerItem
                                    icon={({color, size}) =>( 
                                                <Ionicons name="settings-outline"
                                                color={color}
                                                size={size}
                                                 />
                                            )} 
                                    label="Settings"
                                    onPress= {() => {props.navigation.navigate('HomeScreen')}}
                                /> */}
                            
                </Drawer.Section> 

                {/* <Drawer.Section title="Preferences"> 
                    <TouchableRipple>
                       <View style={styles.preference}>
                            <Text style={{}}>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark}/>
                            </View>
                       </View>
                    </TouchableRipple>
                </Drawer.Section>  */}

                

            </DrawerContentScrollView>



                <Drawer.Section>
                    <DrawerItem
                    icon={({color, size}) =>( 
                                <Ionicons name="reload-outline"
                                color={color}
                                size={size}
                                    />
                            )} 
                            style={{backgroundColor:'whitesmoke'}}
                    label="Refresh Data"
                    onPress= {() => {getJsonData()}}
                />

                <DrawerItem
                    icon={({color, size}) =>( 
                                <Icon name="exit-to-app"
                                color='#ffffff'
                                size={size}
                                />
                            )} 
                    style={{backgroundColor:Global.COLOR.DARK}}
                    color='white'
                    labelStyle={{color: '#ffffff'}}
                    label="Sign Out"
                    onPress= {() => {signOut()}}
                />
            </Drawer.Section>


        </View>
    ):(
        <>

<View style={{flex:1}}>
            <DrawerContentScrollView {...props}>      
            <Drawer.Section style={styles.DrawerSection}>
                <DrawerItem
                        icon={({color, size}) =>( 
                                    <Icon name="home-outline"
                                    color={color}
                                    size={size}
                                     />
                                )} 
                        label="Login"
                        onPress= {() => {props.navigation.navigate('Login')}}
                    />
                </Drawer.Section>
                </DrawerContentScrollView>
        </View>
        </>
    )
    )
}

const styles = StyleSheet.create({
    DrawerContent:{
        flex:1,
        marginBottom:15,
        paddingBottom:15,
        backgroundColor:'whitesmoke',
        borderBottomColor:'silver',
        borderBottomWidth:1
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title: {
        fontSize:16,
        marginTop:3,
        fontWeight:'bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        marginRight:5,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:{
        fontWeight:'bold',
    },
    drawerSection:{
        marginTop:30,
    },
    bottomDrawerSection:{
        marginTop: 30,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1,
        backgroundColor:'whitesmoke',
    },
    preference:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingVertical:12,
        paddingHorizontal:10,
    },
});