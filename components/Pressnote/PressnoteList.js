import React, { Component, useState, useContext } from 'react'
import PostContext from '../Data/PostContext';

import { View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, TouchableOpacity } from 'react-native'

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Header } from 'react-native-elements';
import {BackButton, LeftMenu, ScreenTitle } from '../Header/HeaderBar'
const GLOBAL = require('../Global');
import Login from '../Auth/Login';
import PressnoteDataItemTable from '../Widget/PressnoteDataItemTable';

const PressnoteList = (props) => {

    const navigation = useNavigation();
    const {  pressnoteListData, onShare,

        getLoginKey, loginData, setLoginData } = useContext(PostContext);
    
    return (
        loginData.loginStatus === 'login'?(
        <>
        {/* <HeaderBar title="PRESSNOTE LIST"  headerType="postList"  icon="ios-create-outline"/> */}
       
        <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<BackButton screen="HomeScreen" />}
                centerComponent={<ScreenTitle icon={props.icon} title='PRESSNOTE LIST' />}
                // rightComponent={{ type :'ionicon', icon: 'cart', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />

        <View style={[styles.container]}>
        <View style={[styles.content,{
            marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
            
            <ScrollView>

            {pressnoteListData.map((item, index) => { 
                const tableBgColor = index % 2 == 0 ?'white':'whitesmoke';
                const tableTextNoColor = index % 2 == 0 ?'black':'black';
                const tableBgNoColor = index % 2 == 0 ?'whitesmoke':'white';

                    return(


                <View style={[styles.tableContainer,{backgroundColor: tableBgColor}]} key = {item.id}>
                        
                        <Text style={[styles.tableText,{fontSize:17, color:tableTextNoColor,fontWeight:'bold',
                            textAlign:'center',backgroundColor: tableBgNoColor, flex:1.5}]}>{index + 1 }</Text>
                        {
                            item.mul_images?(
                                <Image style={[styles.image,{flex:3, height:40,borderRadius:2,marginRight:5, marginTop:20}]}
                                source={{ uri: GLOBAL.BASE_URL + `web/media/icon/` + item.mul_images.split(",")[0] }}
                                />
                            ):null}
                        
                        <Text style={[styles.tableText,{flex:19,}]}>{item.title}</Text>
                        <View  style={[styles.tableButtonContainer,{ alignSelf:'center',flex:2,}]} >

                            <TouchableOpacity style={[styles.buttonIcon,{backgroundColor:'tomato'}]} 
                                onPress={() =>  navigation.navigate("EditPressnote", { item })}
                            >
                                
                            <Icon name="comment-edit-outline" color="white" size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity  style={[styles.buttonIcon,{backgroundColor:'black'}]}
                            onPress={() =>  navigation.navigate("PressnoteDetail", { item })}
                            >
                                
                            <Ionicons name="ios-eye-outline"
                                            color="white"
                                            size={20}
                                            />
                            </TouchableOpacity>     
                            
                            <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'white' }]}
                                        onPress={() =>  onShare(GLOBAL.BASE_URL+'news/'+item.slug, item.title, item.subtitle)}
                                        >
                                            <Ionicons name="share-social"
                                                color={GLOBAL.COLOR.DARK}
                                                size={20}
                                            />
                            </TouchableOpacity>           
                        </View>
                </View>

                )
                })
                
                }
                </ScrollView>
            
        </View>
        </View>
        
        </>

        ):
        (<Login/>)
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
    container:{
        flex:1,
        paddingVertical: 0,
    },
    content:{
    },
    buttonIcon:{ width:28, height:28, marginBottom:3, borderRadius:50, marginRight:10
        , marginVertical:8,
    alignItems:'center', justifyContent: 'center'},

    tableContainer:{ 
        flex:1,   
        flexDirection: 'row',
        backgroundColor:'#dfe6e9',
        borderBottomColor:'white',
        borderBottomWidth:2,
    },
    tableButtonContainer:{    
        flex:0.8,
        alignContent:'center',
        alignItems:'center'
    },
    
    tableButton:{    
        flex:1,
    },

    pageTitle:{
        fontSize:19,
        marginBottom:10,
        fontWeight: '700',
        color:'black',
        backgroundColor:'white',
        borderBottomColor:'silver',
        borderBottomWidth:1,
        textAlign:'center',
        paddingVertical:8,
        marginTop:10,
    },
    tableText:{
        fontSize:19,
        marginHorizontal:2,
        paddingHorizontal:4,
        fontWeight:'600',
        color:'#2d3436',
        marginVertical:10,
        
    },
    homeTop:{
        flex:1,
        flexDirection:'row',
    },
    homeTopBlock:{
        flex:3,
        justifyContent:'center',
        padding:4,
        alignItems:'center',
        height:90,
        borderRadius:6,
        marginHorizontal:4,
    
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
        color:'#2d3436'
        
    },
    postContainer:{

    }
})

export default PressnoteList;