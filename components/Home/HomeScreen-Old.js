import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
    View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView,
    ActivityIndicator, TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import OneSignal from 'react-native-onesignal';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Avatar, Overlay, Badge, withBadge, Button } from 'react-native-elements'

import HeaderBar from '../Header/HeaderBar'
import Spinner from '../Widget/Spinner';
import SpinnerModal from '../Widget/SpinnerModal';

// import {notificationManger} from '../notificationManager'
import PushNotification from 'react-native-push-notification'

// import { LocalNotification } from '../Services/LocalPushController'

import Login from '../Auth/Login';
import { notificationManager } from '../notificationManager';
const GLOBAL = require('../Global');



const HomeScreen = (props) => {
    const navigation = useNavigation();
    const { postData, setPostData, bulletinListData, setBulletinListData, postListData, setPostListData, onShare,
        isLoadingPostData, getJsonData, checkLoginFn,
        totalPressnote, getLoginKey, loginData, setLoginData, signOut,
        clearPost, notificationArray, setNotificationArray, spinnerModalVisible, setSpinnerModalVisible,
        setIsLoadingPostData, getBulletinListData, getCategories, getPostData, getPostListData } = useContext(PostContext);

    const [isVisible, setIsVisible] = useState(false);



    // onPressSendNotification = () => {
    //     this.localNotify.showNotification(
    //         1,
    //         "App Notification",
    //         "Local Notification",
    //         {}, //data
    //         {}, //options
    //     )

    // }

    // function showNotification (1, 'app noti', 'local notify') {

    // }



    const handleButtonPress = () => {
        LocalNotification()
    }

    const testNotification = () => {
        PushNotification.localNotification({
            title: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            message: "This is a subText", // (optional) default: none    
        });
    }

    const goToScreen = (screen) => {

        navigation.navigate(screen);
    }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        // alert('test');
        // OneSignal.setAppId("59cc4a09-5ee3-43d7-91ea-e2bb0500acd9");
        //     OneSignal.setLogLevel(6, 0);
        //     OneSignal.setRequiresUserPrivacyConsent(false);
        //     OneSignal.promptForPushNotificationsWithUserResponse(response => {
        //         this.OSLog("Prompt response:", response);
        //         alert('prompt');
        //     });

        // checkLoginFn();
        // PushNotification.configure({
        //     // (optional) Called when Token is generated (iOS and Android)
        //     onRegister: function (token) {
        //       console.log("Home S TOKEN:", token);
        //     },

        //     // (required) Called when a remote is received or opened, or local notification is opened
        //     onNotification: function (notification) {
        //       console.log("NOTIFICATION:", notification);

        //       // process the notification

        //       // (required) Called when a remote is received or opened, or local notification is opened
        //       notification.finish(PushNotificationIOS.FetchResult.NoData);
        //     },

        //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        //     onAction: function (notification) {
        //       console.log("ACTION:", notification.action);
        //       console.log("NOTIFICATION:", notification);

        //       // process the action
        //     },

        //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        //     onRegistrationError: function(err) {
        //       console.error(err.message, err);
        //     },

        //     // IOS ONLY (optional): default: all - Permissions to register.
        //     permissions: {
        //       alert: true,
        //       badge: true,
        //       sound: true,
        //     },

        //     // Should the initial notification be popped automatically
        //     // default: true
        //     popInitialNotification: true,

        //     /**
        //      * (optional) default: true
        //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
        //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
        //      * - if you are not using remote notification or do not have Firebase installed, use this:
        //      *     requestPermissions: Platform.OS === 'ios'
        //      */
        //     requestPermissions: true,
        //   });


        setTimeout(function () {
            // alert('hide');
            setIsVisible(true);
            // Hide_Splash_Screen();  
        }, 500);

        let unmounted = true;
        setIsLoadingPostData(true);

        // getBulletinListData();
        // getPostData();
        // getPostListData();
        // getJsonData();


        //   const sendNotification = () =>{

        //     if(notificationArray !== null){

        //         alert('0000');
        //     //   alert(notificationArray);
        //     const data = {
        //       "included_segments": ["Active Users"],
        //       "app_id": "59cc4a09-5ee3-43d7-91ea-e2bb0500acd9",
        //       "contents": {"en":"ડેમોક્રેટિક પાર્ટીની જીતથી નિશ્ચિત થઈ ગયું છે કે અમેરિકામાં હવે જો બાઈડન રાષ્ટ્રપતિ અને કમાલ હેરિસ ઉપરાષ્ટ્રપતિ બનવા જઈ રહ્યાં છે."},
        //       "title": {"en":"Hello title generated"},
        //       "data": {"custom_data":"Some Values"},
        //       // "url": "http://alivecreate.com/",
        //       // "buttons": [{"id": "id2", "text": "second button", "icon": "ic_launcher"}, {"id": "id1", "text": "first button", "icon": "ic_launcher"}],
        //       "canceled": true,
        //       "android_sound": "notification",
        //       "big_picture": "http://alivecreate.com/front/img/web-design.png",
        //       "android_channel_id": "085dab4a-15bc-4f90-bc79-9e834016c3e0",
        //       "small_icon": "ic_action_name",
        //       "large_icon": "https://mailvadodara.com/front/images/mailvadodara-icon.png",
        //       "android_accent_color": "black",
        //       "android_led_color": "black",
        //       "android_visibility": 1,
        //        "headings": {
        //           "en": "1111 News Added - ભારતની દીકરીએ રચ્યો ઈતિહાસ:અમેરિકામાં પહેલા મહિલા ઉપરાષ્ટ્રપતિ બનશે કમલા હેરિસ, એક સાથે 3 રેકોર્ડ બનાવ્યાં 😊"
        //       }
        //   };
        //   const url = 'https://onesignal.com/api/v1/notifications';

        //   const options = {
        //     method: 'POST',
        //     headers: {'Authorization': 'Basic YTgxNTVkNWEtOGUxYS00MWE3LTk5NzEtZDcyM2VlZmFmNzVk', 'content-type': 'application/json' },
        //     data: data,
        //     url,
        //   };
        //     axios(options);
        // }else{
        //     alert('1');
        // }
        // }


        const interval = setInterval(() => {
            getJsonData();
        }, 3000);
        getLoginKey();
        return () => { unmounted = false };

    }, []);

    return (
        loginData.loginStatus === 'login' ? (
            <>
                <HeaderBar title="DASHBOARD" headerType="dashboardWithMenu" icon="document-text-outline" />
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
                                    onPress={() => navigation.navigate("BulletinListScreen")}
                                >
                                    <Ionicons name="ios-images-outline" size={30} />
                                    <Text style={styles.title}>Bulletins</Text>

                                    <Badge
                                        status="success"
                                        containerStyle={{ width: 20 }}
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073', height: 20, paddingVertical: 4 }}
                                        textStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                        value={bulletinListData.length}
                                    />
                                </TouchableOpacity>
                            </View>


                            <View style={[styles.homeTopBlock, { backgroundColor: '#55efc4' }]}>
                                <TouchableOpacity
                                    style={styles.buttonTop}
                                    onPress={() => { goToScreen('PressnoteList') }}
                                >
                                    <Ionicons name="newspaper-outline" size={30} />
                                    <Text style={styles.title}>Pressnotes</Text>


                                    <Badge
                                        status="success"
                                        containerStyle={{ width: 20 }}
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073', height: 20, paddingVertical: 4 }}
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
                                        badgeStyle={{ width: 80, backgroundColor: '#00000073', height: 20, paddingVertical: 4 }}
                                        textStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                        value={postListData.length}
                                    />
                                </TouchableOpacity>


                            </View>

                            <Button
                                title="Solid Button"
                                onPress={() => { toggleOverlay() }}

                            />
                        </View>

                    </View>



                </View>
            </>
        ) :
            (<Login />)
            
    )
}

const styles = StyleSheet.create({
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