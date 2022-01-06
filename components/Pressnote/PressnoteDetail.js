import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import { View, Text, StyleSheet, Image, Dimensions, FlatList, 
    ScrollView,ActivityIndicator, TouchableOpacity,useWindowDimensions, Linking, ImageBackground  } from 'react-native'

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
import Spinner from '../Widget/Spinner';

const GLOBAL = require('../Global');

const PressnoteDetail = ({props, route}) => {

    const { id, category_id, title, subtitle, youtube, body, image, slug, mul_images, created_at, status } = route.params.item;

    const { postListData, postBody, setPostBody, postDetailData, intervalReq, setIntervalReq, postMul_Images, setPostMul_Images,
        getLoginKey, loginData, setLoginData, setPostDetailData, setPostListData, getPressnoteDetailData,
        notifyMessage, isLoadingPost, setIsLoadingPost } = useContext(PostContext);
        
        
    const [postMulImageArray, setPostMulImageArray] = useState(null);

    const navigation = useNavigation();
    
    

    useEffect(() => {
        

        setIsLoadingPost(true);
        // getPressnoteDetailData(id);
    
    // var postMulImages = [];
    
    if(mul_images !== null){
        let i = 0;
        let fileArray = [];
        let totalArray = mul_images.replace(/^\{|\}$/g,'').split(',');
        
        for(i = 0; i< totalArray.length; i++)
        {
        fileArray.push(totalArray[i]);
        }
        setPostMulImageArray(fileArray);
    }
    let no = 1;
                           

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
//                         source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + image }}/>  

//                 <Text style={[styles.postTitle,{flex:3}]}>{title}</Text>
//             </View>
//             <HtmlReader html={postDetailData.body}/>
//     </ScrollView>
            
//         </View>
//         </View>
//         </>
//     )
// }




// const regex = /localhost:8000/gi;
// alert(JSON.stringify(post));

return (
    loginData.loginStatus === 'login'?(
    
    <>
    
         {postDetailData !== null? 
         (
             <>
             <HeaderBar title={postDetailData.type == 'bulletin'?'Bulletin Details':'Pressnote Details110'+id} headerType="postDetail" id={id}  
             postType={postDetailData.type}   icon="document-text-outline" />
 
        <View style={[styles.container]}>
            
        <View style={[styles.content,{
            marginHorizontal:0, paddingVertical:0,flex:5}]}>
                
    <ScrollView style={{ flex: 1, paddingRight:10, marginTop:4 }}>
            <View style={{flex:1, flexDirection:'row', }}>
                <Text style={[styles.postTitle,{fontWeight:'bold' }]}>{title}</Text>
            </View>

            <View style={{ borderBottomWidth:1, 
                        borderBottomColor:'silver',marginBottom:10, paddingVertical:4}}>
                <Text style={[styles.postTitle,{flex:1}]}>{subtitle}</Text>
                
                <Text style={{color:'gray',fontWeight:'bold'}}>DATE: {created_at}</Text>
            </View>

            
        <FlatList
            data={ postMulImageArray }
            renderItem={ ({item, index}) =>
              <View style={styles.GridViewContainer}>

          {
            postMulImageArray !==null?
            (
            <>
            <View style={{borderRadius:40, padding:1, flex:1}}>

            <ImageBackground
              style={[styles.imageThumbnail,{flex:1, width:width/2.4, borderWidth:1, borderColor:'silver'}]}
              source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item }}
              imageStyle={{ borderRadius: 6}}
            >

            </ImageBackground>
            </View>
            </>
            ):null
          }
</View> 
}
            numColumns={2}
            keyExtractor={(index) => index.toString()}
         />
           
    </ScrollView>
            
        </View>
        </View>
            </>
         ): null}
    </>
    ):
    (<Login/>)
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
    //                     source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + image }}/>  

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
    vw: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5e5e5",
        height:200,
      },
    p:{color:'red', fontSize:100, color:'red'},

    imageThumbnail: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flex: 2,
        height: width/2,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
      },
      GridViewContainer: {
          marginTop:10,
        flex: 2,
        flexDirection:'column'
      },

    container:{
        flex:1,
        paddingLeft:10,
        paddingTop:4
    },
    postTitle:{
        fontSize:20,
        color:'black',
        textAlign:'justify'
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

export default PressnoteDetail;