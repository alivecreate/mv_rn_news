import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
    View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView,
    ActivityIndicator, TouchableOpacity, BackHandler, Alert
} from 'react-native'

import { Header } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Avatar, Overlay, Badge, withBadge, Button } from 'react-native-elements'

// import HeaderBar from '../Header/HeaderBar'
import {LeftMenu, ScreenTitle } from '../Header/HeaderBar'

import Spinner from '../Widget/Spinner';
import SpinnerModal from '../Widget/SpinnerModal';

import Login from '../Auth/Login';
import { notificationManager } from '../notificationManager';
const GLOBAL = require('../Global');



const HomeScreen = (props) => {
    const navigation = useNavigation();
    

    const { getJsonData, totalNews, totalBulletin,spinnerNavigationModalVisible,
        
        setSpinnerNavigationModalVisible,
        totalPressnote, getLoginKey, loginData, spinnerModalVisible, setSpinnerModalVisible,
        setIsLoadingPostData } = useContext(PostContext);

    const [isVisible, setIsVisible] = useState(false);

    // const goToScreen = (screen) => {
    //     // alert(screen);
    //     // setSpinnerNavigationModalVisible(true);

    //         navigation.navigate(screen);
    //     // setTimeout(() => {        
    //     //     navigation.navigate(screen);
    //     // }, 10);
    // }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    

    useEffect(() => {

        const backAction = () => {
            Alert.alert("Close App!", "Are you sure you want to close?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },     
               { text: "YES", onPress: () => BackHandler.exitApp() }
            ]
            );
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();

    });

    return (
        loginData.loginStatus === 'login' ? (
            <>
                
                <Header
                    statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                    leftComponent={<LeftMenu />}
                    centerComponent={<ScreenTitle icon='document-text-outline' title='Dashboard' />}
                    // rightComponent={{ type :'ionicon', icon: 'ios-ellipsis-vertical-sharp', color: 'white' ,size:25}}
                    containerStyle={styles.headerBar}
                />
                   
                    {
                        spinnerNavigationModalVisible == true?(
                                            
                            <SpinnerModal spinnerText="Loading Data..." />

                        ):null
                    }


                {/* {
                    spinnerModalVisible == true?(
                        
                        <SpinnerModal spinnerText="Loading Data..." />

                    ):null
                }
                 */}

                {
                    visible == true ? (

                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size={props.size} color={GLOBAL.COLOR.DARK} />
                        </View>
                        // <Spinner size={60} />
                    ) : null
                }



                <View style={[styles.container, { flex: 1 }]}>
                    <View style={[styles.content, { flex: 1 }]}>
                        <Text style={[styles.pageTitle, { marginTop: 4 }]}>Add Bulletins and Pressnote</Text>

                        <View style={styles.homeTop}>


                            <View style={[styles.homeTopBlock, { backgroundColor: 'silver' }]}>
                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={() => navigation.navigate("CreateBulletin")}
                                >
                                    <Ionicons name="ios-create-outline" size={30} />
                                    <Text style={styles.title}>Write</Text>
                                    <Text style={styles.title}>Bulletin</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={[styles.homeTopBlock, { backgroundColor: '#74b9ff' }]}>
                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={() => navigation.navigate("CreatePressnote")}
                                >
                                    <Ionicons name="ios-create-outline" size={30} />
                                    <Text style={styles.title}>Write</Text>
                                    <Text style={styles.title}>Pressnote</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                        <Text style={[styles.pageTitle, {}]}>List of Articals</Text>
                        <View style={styles.homeTop}>
                            <View style={[styles.homeTopBlock, { backgroundColor: '#a29bfe' }]}>

                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={() => navigation.navigate('BulletinListScreen')}
                                >
                                    <Ionicons name="ios-images-outline" size={30} />
                                    <Text style={styles.title}>Bulletins</Text>

                                    <Badge
                                        status="success"
                                        containerStyle={{ width: 20 }}
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073',
                                         justifyContent:'center' ,
                                          height: 26, paddingVertical: 4 }}
                                        textStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                        value={totalBulletin}
                                    />
                                </TouchableOpacity>
                            </View>


                            <View style={[styles.homeTopBlock, { backgroundColor: '#55efc4' }]}>
                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={()=>navigation.navigate('PressnoteList')}
                                    
                                >
                                    <Ionicons name="newspaper-outline" size={30} />
                                    <Text style={styles.title}>Pressnotes</Text>


                                    <Badge
                                        status="success"
                                        containerStyle={{ width: 20 }}
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073', justifyContent:'center' ,
                                         height: 26, paddingVertical: 2 }}
                                        textStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                        value={totalPressnote}
                                    />
                                </TouchableOpacity>
                            </View>


                            <View style={[styles.homeTopBlock, { backgroundColor: 'silver' }]}>
                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={() => navigation.navigate("PostListScreen")}
                                    >
                                    <Ionicons name="newspaper-outline" size={30} />
                                    <Text style={styles.title}>News</Text>


                                     <Badge
                                        status="success"
                                        containerStyle={{ width: 20 }}
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073', justifyContent:'center' ,
                                         height: 26, paddingVertical: 4 }}
                                        textStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                        value={totalNews}
                                    />
                                </TouchableOpacity>


                            </View>
                        </View>

                    </View>



                </View>
            </>
        ) :
            (<Login />)
            
    )
}

const styles = StyleSheet.create({
    
    headerBar: {
        backgroundColor: GLOBAL.COLOR.LIGHT,
        justifyContent: 'space-around',

    },
    headerBarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',
    },

    container: {
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 0,
    },
    buttonTop: {
        justifyContent: 'center', alignItems: 'center'
    },
    content: {
    },
    buttonIcon: {
        width: 28, height: 28, marginBottom: 3, borderRadius: 50, marginRight: 10, marginVertical: 8,
        alignItems: 'center', justifyContent: 'center'
    },

    tableContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#dfe6e9',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    tableButtonContainer: {
        flex: 0.8,
        alignContent: 'center',
        alignItems: 'center'
    },

    tableButton: {
        flex: 1,
    },

    pageTitle: {
        fontSize: 19,
        marginBottom: 10,
        fontWeight: '700',
        color: 'black',
        backgroundColor: 'white',
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        textAlign: 'center',
        paddingVertical: 8,
        marginTop: 10,
    },
    tableText: {
        fontSize: 19,
        marginHorizontal: 2,
        paddingHorizontal: 4,
        fontWeight: '600',
        color: '#2d3436',
        marginVertical: 10,

    },
    homeTop: {
        flexDirection: 'row',
    },
    homeTopBlock: {
        flex: 3,
        justifyContent: 'center',
        padding: 4,
        alignItems: 'center',
        height: 90,
        borderRadius: 6,
        marginHorizontal: 4,
        marginVertical: 2,

    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2d3436'

    },
    postContainer: {

    }
})

export default HomeScreen;