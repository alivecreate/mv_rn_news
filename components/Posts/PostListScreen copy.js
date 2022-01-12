import React, { Component,useEffect, useState, useContext } from 'react'
import PostContext from '../Data/PostContext';

import { View, Text, StyleSheet, Image, Dimensions,
    BackHandler,
    FlatList, ScrollView, TouchableOpacity } from 'react-native'

import axios from 'axios';
import { useNavigation, StackActions } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { Header } from 'react-native-elements';
import DataItemTable from '../Widget/DataItemTable';

import {BackButton, LeftMenu, ScreenTitle } from '../Header/HeaderBar'

import Login from '../Auth/Login';
// import PostDetailScreen from './PostDetailScreenTest'
const GLOBAL = require('../Global');

const popAction = StackActions.pop(1);

    

const PostListScreen = (props) => {

    const navigation = useNavigation();
    const { postListData, onShare, loginData, setSpinnerModalVisible } = useContext(PostContext);

    
    useEffect(() => {
        setSpinnerModalVisible(false);
        
    })

    return (
        loginData.loginStatus === 'login'?(
        <>
        {/* <HeaderBar title="NEWS LIST"  headerType="postList"  icon="document-text-outline"/> */}
        
            <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<BackButton screen="HomeScreen" />}
                
                centerComponent={<ScreenTitle icon='document-text-outline' title='News List' />}
                // rightComponent={{ type :'ionicon', icon: 'cart', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />


        <View style={[styles.container]}>
            
        <View style={[styles.content,{
            marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
            <ScrollView>
            {postListData.map((item, index) => { 
                const tableBgColor = index % 2 == 0 ?'white':'whitesmoke';
                const tableTextNoColor = index % 2 == 0 ?'black':'black';
                const tableBgNoColor = index % 2 == 0 ?'whitesmoke':'white';

                
                    
                
                    return(

                    <View  key={item.id} style={[styles.tableContainer, { backgroundColor: tableBgColor }]}>
                        <Text style={[styles.tableText, {
                            fontSize: 15, color: tableTextNoColor, fontWeight: 'bold',
                            textAlign: 'center', backgroundColor: tableBgNoColor, flex: 1.5
                        }]}>{index + 1}</Text>
            
                        <Image style={[styles.image, { flex: 4,height: 70,  borderRadius: 2, marginRight: 5, marginTop: 20 }]}
                            source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item.image }}
                        />
            
                        <Text style={[styles.tableText, { flex: 19, }]}>{item.title}</Text>
                        <View style={[styles.tableButtonContainer, { alignSelf: 'center', flex: 2, }]} >
                            <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'tomato' }]}
                                onPress={() => navigation.navigate("EditPost", {item} )}
                            >
                                <Icon name="comment-edit-outline" color="white" size={20} />
                            </TouchableOpacity>
            
                            <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'black' }]}
                                onPress={() => navigation.navigate("PostDetailScreen",  {item})}
                                >
                                <Ionicons name="ios-eye-outline"
                                    color="white"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'white' }]}
                                onPress={() => onShare(GLOBAL.BASE_URL + 'news/' + item.slug, item.title, item.subtitle)}
                            >
                                <Ionicons name="share-social"
                                    color={GLOBAL.COLOR.DARK}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
        
        
                        // <DataItemTable source={GLOBAL.BASE_URL + `web/media/xs/` + item.image} key={item.id} item={item} 
                        //    index={index} tableBgColor={tableBgColor} tableTextNoColor={tableTextNoColor} tableBgNoColor={tableBgNoColor}
                        // />


                // <View style={[styles.tableContainer,{backgroundColor: tableBgColor}]} key = {item.id}>
                        
                //         {/* {const tableBgColor = index % 2 == 0 ?'#636e72':'red';} */}
                        
                //         <Text style={[styles.tableText,{fontSize:17, color:tableTextNoColor,fontWeight:'bold',
                //             textAlign:'center',backgroundColor: tableBgNoColor, flex:1.5}]}>{index + 1 }</Text>
                            
                //         <Image style={[styles.image,{flex:3, height:50,borderRadius:2,marginRight:5, marginTop:20}]}
                //                         source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item.image }}
                //         />

                //         <Text style={[styles.tableText,{flex:19,}]}>{item.title}</Text>
                //         <View  style={[styles.tableButtonContainer,{ alignSelf:'center',flex:2,}]} >

                //             {/* <TouchableOpacity style={[styles.buttonIcon,{backgroundColor:'tomato'}]} >
                                
                //             <Icon name="comment-edit-outline" color="white" size={20} />
                //             </TouchableOpacity> */}

                //             <TouchableOpacity  style={[styles.buttonIcon,{backgroundColor:'black'}]}
                //                 onPress={() =>  navigation.navigate("PostDetailScreen", { item })}>
                                
                //             <Ionicons name="ios-eye-outline"
                //                             color="white"
                //                             size={20}
                //                             />
                //             </TouchableOpacity>       
                            
                //             <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'white' }]}
                //                         onPress={() =>  onShare(GLOBAL.BASE_URL+'news/'+item.slug, item.title, item.subtitle)}
                //                         >
                //                             <Ionicons name="share-social"
                //                                 color={GLOBAL.COLOR.DARK}
                //                                 size={20}
                //                             />
                //             </TouchableOpacity>           
                //         </View>
                // </View>


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
        fontSize:17,
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

export default PostListScreen;