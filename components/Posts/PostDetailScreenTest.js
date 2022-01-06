import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import { View, Text, StyleSheet, Image, Dimensions, FlatList, 
    ScrollView, TouchableOpacity,useWindowDimensions, Linking  } from 'react-native'

import { WebView } from 'react-native-webview';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HTML from "react-native-render-html";
import HtmlReader from '../Html/HtmlReader';
import HeaderBar from '../Header/HeaderBar'
import PostDeleteModel from '../Posts/PostDeleteModel';
import { useNavigation } from '@react-navigation/native';
const GLOBAL = require('../Global');


const PostDetailScreen = ({props, route}) => {

    const { id } = route.params;
    const { title } = route.params;
    const { image } = route.params;
    // const { image } = route.params;

    const { postListData, postDetailData, intervalReq, setIntervalReq, setPostDetailData, setPostListData, getPostDetailData,
         notifyMessage } = useContext(PostContext);

        //  const[postDetailData, setPostDetailData] = useState([]);
        //  const[interval, setInterval] = useState([]);
         

                const navigation = useNavigation();
    
    const getPostDetails = (id) => {

            const formData = new FormData();
            formData.append('id', id);
            axios.post(GLOBAL.BASE_URL+'fblog/public/api/post/get-post-detail',formData)
              .then(res => {
                // alert('yes');
                
                if(res.data.post !== null){
                    setIntervalReq(true);
                    setPostDetailData(res.data.post);
                    notifyMessage('clicked data Back- '+JSON.stringify(res.data.post));
                    
                }else{
                    // setPostDetailData([]);
                    setIntervalReq(false);
                    notifyMessage('clicked data - '+JSON.stringify(res.data.post));
                    
                    // navigation.navigate('PostListScreen');
                }
                

                // if(res.data.post !== null){
                //     setPostDetailData(res.data.post);
                //     notifyMessage('clicked data - '+JSON.stringify(res.data.status));
                //     // alert('data al = ' + JSON.stringify(res.data));
                //     // navigateScreen();
                //     // setIntervalReq(true);
                // }
                // else{
                //     notifyMessage('clicked data - '+JSON.stringify(res.data.post));
                //     clearInterval(interval);
                    
                //     // clearInterval(interval);
                    
                //     setTimeout(function (argument) {
                //         alert('clear');
                //         clearInterval(interval);
                //         // setPostDetailData([]);
                //         navigation.navigate('PostListScreen');
                //     },1);

                //     // setIntervalReq(false);
                //     // setPostDetailData([]);
                // }
              })
              .catch(err => {
                  alert('Server Error - '+err);
              })
              
    }
    
    

    useEffect(() => {
        // setPostDetailData([]);
        alert(id);
        getPostDetailData(id);
        

            // const interval = setInterval(function(){
            //     getPostDetailData(id);
                
            //     // if(intervalReq == false){
            //     //    setTimeout(function (argument) {
            //     //         clearInterval(interval);
            //     //         setPostDetailData([]);
            //     //         navigation.navigate('PostListScreen');
            //     //     },1000);
            //     // } 
            // }, 10000);

                let no = 1;
                // setInterval (function(){
                    
                //     if(intervalReq == false){
                //         clearInterval(interval);
                //         setPostDetailData([]);
                //         navigation.navigate('PostListScreen');
                //     }
                // }, 5000);

                return () => {
                    console.log("Behavior right before the component is removed from the DOM.");
                    
                    alert('willmoount');
                }
                
                //   return () => {
                //     alert("Time stopped.");
                //     clearInterval(intervalId);
                //   }

                // return () => {

                //     alert('willmoount');
                //   }
                

    }, [id])
    
    const htmlStyles = { p: {fontFamily: 'Lato'} }
    // const body = postDetailData.body;
    
const contentWidth = useWindowDimensions().width;

// {this.state.page === 'news'? <Text>data</Text>: null}

// const display = () => {
//     return(
//         <>
//         <HeaderBar title="POST LIST"  headerType="withBack" id={id}/>
//         <View style={[styles.container]}>

//         <View style={[styles.content,{
//             marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
//     <ScrollView style={{ flex: 1, paddingRight:10 }}>
//             <View style={{flex:1, flexDirection:'row', borderBottomWidth:1, 
//                         borderBottomColor:'silver', marginBottom:2, paddingBottom:4}}>
//                 <Image style={[styles.image,{flex:1,height:100, borderRadius:2,marginRight:5}]}
//                         source={{ uri: GLOBAL.BASE_URL + `fblog/public/web/media/xs/` + image }}/>  

//                 <Text style={[styles.postTitle,{flex:3}]}>{title}</Text>
//             </View>
//             <HtmlReader html={postDetailData.body}/>
//     </ScrollView>
            
//         </View>
//         </View>
//         </>
//     )
// }

return (
    <>
    
         {postDetailData !== null? 
         (
             <>
             <HeaderBar title="POST LIST"  headerType="withBack" id={id}/>
        <View style={[styles.container]}>

        <View style={[styles.content,{
            marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
    <ScrollView style={{ flex: 1, paddingRight:10 }}>
            <View style={{flex:1, flexDirection:'row', borderBottomWidth:1, 
                        borderBottomColor:'silver', marginBottom:2, paddingBottom:4}}>
                <Image style={[styles.image,{flex:1,height:100, borderRadius:2,marginRight:5}]}
                        source={{ uri: GLOBAL.BASE_URL + `fblog/public/web/media/xs/` + image }}/>  

                <Text style={[styles.postTitle,{flex:3}]}>{title}</Text>
            </View>
            <HtmlReader html={postDetailData.body}/>
    </ScrollView>
            
        </View>
        </View>
            </>
         ): null}
    </>
)

  
// return (
    //     <>
        
    //     {/* return(
    //     <HeaderBar title="POST LIST"  headerType="withBack" id={id}/>
    //     <View style={[styles.container]}>

    //     <View style={[styles.content,{
    //         marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
    // <ScrollView style={{ flex: 1, paddingRight:10 }}>
    //         <View style={{flex:1, flexDirection:'row', borderBottomWidth:1, 
    //                     borderBottomColor:'silver', marginBottom:2, paddingBottom:4}}>
    //             <Image style={[styles.image,{flex:1,height:100, borderRadius:2,marginRight:5}]}
    //                     source={{ uri: GLOBAL.BASE_URL + `fblog/public/web/media/xs/` + image }}/>  

    //             <Text style={[styles.postTitle,{flex:3}]}>{title}</Text>
    //         </View>
    //         <HtmlReader html={postDetailData.body}/>
    // </ScrollView>
            
    //     </View>
    //     </View>
    //     ): null */}
        
        
    // ) 


    

}

const styles = StyleSheet.create({

    p:{color:'red', fontSize:100, color:'red'},


    container:{
        flex:1,
        paddingLeft:10,
        paddingTop:4
    },
    postTitle:{
        fontSize:20,
        color:'black',
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

export default PostDetailScreen;