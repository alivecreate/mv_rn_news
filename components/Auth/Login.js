import React, { Component, useState, useContext, useEffect} from 'react'

import { useTheme } from 'react-native-paper'

import {
    Text, Image, View, StatusBar, KeyboardAvoidingView,
    TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, Platform, Alert,
} from 'react-native'

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
// import Users from '../../../model/Users';
// import { AuthContext } from '../../../components/context'
// import { ScrollView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../Home/HomeScreen';
import CreateBulletin from '../Bulletin/CreateBulletin';
import PostContext from '../Data/PostContext';


import GLOBAL from "../Global";


const Login = () => {
    const { colors } = useTheme();

    // const [loginData,setLoginData ] = useState([]);
    
    // const { loginData, setLoginData } = useContext(PostContext);

    const { loginData, setLoginData, notifyMessage } = useContext(PostContext);
  


    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    })
    
    // const { notifyMessage } = useContext(PostContext);

    const textInputChange = (val) => {
        // alert(val);
        if (val.length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false

            });
        }
    }
    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            })
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            })
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    
    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true,
            })
        } else {
            setData({
                ...data,
                isValidUser: false,
            })
        }
    }
   

    const loginHandle = (Email, Password) => {
        // alert(Email);
        axios
            // .post('http://192.168.43.224/fblog/public/api/post/check-login',
            .post(GLOBAL.BASE_URL + 'api/post/check-login',
                {
                    email: Email,
                    password: Password,
                }
                , {
                    headers: {
                        'Accept': 'application/json',
                        // 'X-CSRF-TOKEN': 'PLVfyefUWfsNGhWFNFNIwbCf9QZEsdBiGgsL5Cqf'
                        
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                }
            )
            .then(response => {

                if(response.data.status == 'inactive'){
                    notifyMessage(response.data.message);
                }
                else if(response.data.status == 'success'){
                    notifyMessage(response.data.message);
                    let data = {  
                        email: Email,  
                        password: Password,
                        loginStatus: 'login',
                        loginUserData: response.data.loginUserData
                      }

                    AsyncStorage.setItem('loginData',JSON.stringify(data));  
                    setLoginData(data);
                 
                }
                else if(response.data.status == 'wrong'){
                    notifyMessage(response.data.message);
                }
                else if(response.data.status == 'notfound'){
                    notifyMessage(response.data.message);
                }
                else{
                    notifyMessage('please try again');

                }

                // if (JSON.stringify(response.data.code) == 1) {
                //     notifyMessage(response.data.message);
                //     // signIn(data.email, response.data);
                // } else {
                //     notifyMessage(response.data.message);

                //     // notifyMessage(response.data.message)
                // }
            })
            .catch(error => {
                alert('err'+JSON.stringify(error));
            });
    }
    


useEffect(() => {

    // alert('test');
    const jsonValue = JSON.stringify('testing asnc');
    
    // const value1 = AsyncStorage.getItem('key');
    // alert(AsyncStorage.getItem('loginData'));
    // AsyncStorage.setItem('user', jsonValue);
    
    // userToken = await AsyncStorage.getItem('usrArr')
    
    // const value = await AsyncStorage.getItem('@storage_Key')
    
    // alert(JSON.stringify(AsyncStorage.getItem('usrArr')));
    
    },[]);
    

    return (
        loginData.loginStatus === 'login'?(
            <CreateBulletin/>
        ):
        (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.text_header}>Login to Admin Panel</Text>
                
            
                </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}>

                <KeyboardAwareScrollView>
            <View style={{alignItems:'center', marginBottom:30, 
        borderBottomWidth:1,
        borderBottomColor:'silver'}}>
              <Animatable.Image 
                animation="bounceIn"
                duration={1500}
                source={require('../../assets/mailvadodara-logo-name.png')}
                style={styles.logo}
              ></Animatable.Image>
              </View>

                    <Text style={[styles.text_footer, , {
                        color: colors.text
                    }]}>EMAIL ID</Text>

                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />

                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor='#c2c2c2'
                            style={[styles.textInput, {
                                color: 'gray'
                            }]}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color={colors.text}
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>email must be 4 character long.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}>Password</Text>

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor='#c2c2c2'
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: 'gray'
                            }]}
                            autoCapitalize='none'
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="gray"
                                    size={20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="gray"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 6 character long.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { loginHandle(data.email, data.password) }}
                        >
                            <LinearGradient
                                colors={['black', 'black']}
                                style={styles.signIn}
                            >
                                <Text
                                    style={[styles.textSign, { color: 'white' }]}
                                >LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </Animatable.View>
        </View>
        )
    )
};




const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBAL.COLOR.LIGHT,
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{

        width: width*0.70,
        height: 38,
        marginBottom:15,

    },

    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text_header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },

    text_footer: {
        color: '#05375a',
        fontSize: 22
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        color: '#05375a',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black',
        fontSize: 20,
        color:'gray'

    },
    errorMsg: {
        color: 'red'
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
export default Login;