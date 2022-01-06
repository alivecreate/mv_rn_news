import React, { Component } from 'react'
import {
    Text, Image, View, StatusBar,
    TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, Platform
} from 'react-native'

import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
// import {AuthContext} from '../../../components/context'
import axios from 'axios';
// import GLOBAL from '../../Globals';
// 
import GLOBAL from '../Global';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';



const CreateBulletin = ({ navigation }) => {
    

    const [data, setData] = React.useState({
        name:'',
        email: '',
        confirm_password: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    })

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const registerHandle = (name, email , password) =>{

            const obj = {
                name: name,
                email: email,
                password: password
              }
              axios
                .post(GLOBAL.BASE_URL+'titanic/public/api/register',
                  {
                    name: data.name,
                    email: data.email,
                    password: data.name,
                    // _token :'PLVfyefUWfsNGhWFNFNIwbCf9QZEsdBiGgsL5Cqf'
                  }
                  ,{
                    headers: {
                        // 'Accept': 'application/json',
                        // 'X-CSRF-TOKEN': 'PLVfyefUWfsNGhWFNFNIwbCf9QZEsdBiGgsL5Cqf'
                    }}
                )
                .then(response => {
                //   alert(JSON.stringify(response));
                  if(JSON.stringify(response.data.msg) === 'exists'){
                    alert('user exists');
                  }else{
                    alert(JSON.stringify(response.data.msg)); 
                    
                    // const foundUser=()=> {
                    //     return userName == item.username && Password == item.password;
                    // };
                    signIn(data.email, data.password);
                  }
                })
                .catch(error => {
                  alert(JSON.stringify(error));
                });

        // alert('111');
        // alert('name -'+ name + ' email - ' + email + ' password -' + password)
        // const foundUser = Users.filter( item =>{
        //     return name == item.name && Password == item.password;
        // });

        // if(data.name.length ==0 || data.password.length ==0){
        //     Alert.alert('Wrong Input!', 'name or Password field cannot be empty.',[
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if(foundUser.length == 0 ){
        //     Alert.alert('Invalid User!', 'name or Password is Invalid.',[
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // signIn(foundUser);

    }

    const textInputChangeName = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false
            });
        }
    }

    const textInputChangePassword = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                password: val,
                check_textInputChange: true
            });
        }
    }

    
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        })
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        })
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffcc29" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>

                <KeyboardAwareScrollView>
                    <Text style={styles.text_footer}>Name</Text>

                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />

                        <TextInput
                            placeholder="Your Full Name"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChangeName(val)}
                        />
                    </View>


                    <Text style={styles.text_footer}>Email</Text>

                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />

                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >

                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}

                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChangePassword(val)}
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


                    {/* <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
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
                    </View> */}

                    <View style={styles.button}>
                        
                <TouchableOpacity
                    onPress={() => {registerHandle( data.name, data.email, data.password )}}                
                    // onPress={() => {click()}}
                    style={styles.signIn}

                >
                        <LinearGradient
                            colors={['#ffcc29', 'yellow']}
                            style={styles.signIn}
                        >
                            <Text
                                style={[styles.textSign, { color: 'black' }]}
                            >Sing Up</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: 'black',
                                backgroundColor: 'black',
                                borderWidth: 1,
                                marginTop: 15
                            }]}>
                            <Text style={[styles.textSign, {
                                color: 'white'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </Animatable.View>

        </View>
    );
};

export default CreateBulletin;


const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcc29'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 4,
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
        fontSize: 18
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
