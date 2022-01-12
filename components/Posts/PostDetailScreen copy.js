import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
    View, Text, StyleSheet, Image, Dimensions, FlatList, BackHandler, Alert, 
    ScrollView, VirtualizedList, ActivityIndicator, TouchableOpacity, useWindowDimensions, Linking, ImageBackground
} from 'react-native'

const { width, height } = Dimensions.get('window');

import HtmlReader from '../Html/HtmlReader';
import { Header } from 'react-native-elements';

import { BackButton, ScreenTitle, DeleteButton } from '../Header/HeaderBar'
import ImageItems from '../Widget/ImageItems';

import { useNavigation, StackActions, DrawerActions, useFocusEffect, useCallback } from '@react-navigation/native';
import Spinner from '../Widget/Spinner';
import Ionicons from 'react-native-vector-icons/Ionicons'

const GLOBAL = require('../Global');
// import Login from '../Auth/Login';


const PostDetailScreen = ({ props, route }) => {

    // const { id, category_id, title, subtitle, youtube, body, image, slug, mul_images, status } = route.params.item;

    
    const backAction = () => {
        // alert('ggg');
        // navigation.dispatch(popAction);
        // navigation.navigate("PostListScreen");
        // return true;
    };

    const { id, category_id, title, subtitle, youtube, body,
         image, slug, mul_images, created_at, status } = route.params.item;


    const { setIsDeleting,
         postDetailData, intervalReq, setIntervalReq, postMul_Images, setPostMul_Images,
         postMulImageArray, setPostMulImageArray, 
        getLoginKey, loginData, setLoginData, setPostDetailData, setPostListData, getPostDetailData,
        notifyMessage, isLoadingPost, setIsLoadingPost } = useContext(PostContext);

    const [postDetails, setPostDetails] = useState([]);
    const [screenName, setScreenName] = useState('');
    const [screenTitle, setScreenTitle] = useState('');


    const navigation = useNavigation();
    const popAction = StackActions.pop(1);


    const NewBack = () => {
        return (
            <Ionicons name="chevron-back-outline" size={20}
                color='white'
                onPress={() => navigation.navigate("PostListScreen")}
            >Back</Ionicons>
        )
    }

    // const backAction = () => {
    //     // navigation.goBack("PostListScreen");
    //     navigation.navigate("PostListScreen");
    //     return true;
    //     // alert('hh');
    //     // const jumpToAction = navigation.jumpTo('PostListScreen', { name: 'PostListScreen' });
    //     navigation.dispatch('PostListScreen');
    // };
    
    const renderItem= () => {
        return (
            <>
            <ImageItems 
            />
            </>
        
        )
      }


    
    useEffect(() => {

        

        // BackHandler.removeEventListener("hardwareBackPress", backAction);

        setIsLoadingPost(true);
        getPostDetailData(route.params.item.id);
        setIsDeleting(false);

        
        let no = 1;

        const stopYoutube = () => {
            setPostDetails({ ...postDetails, youtube: null });
            navigation.goBack();
        }


        // BackHandler.addEventListener("hardwareBackPress", backAction);

        // return () =>
        //     BackHandler.removeEventListener("hardwareBackPress", backAction);

        console.log(route.params.type);

        if (route.params.item.type === 'bulletin'){
            setScreenName("BulletinListScreen");
            setScreenTitle("Bulletin Details");
        }
        else if(route.params.item.type === 'news'){
            setScreenName("PostListScreen");
            setScreenTitle("News Details 0");
        }

        else{
            setScreenName("PostListScreen");
            setScreenTitle("News Details");
        }

    }, [route.params.item.id])

    // useFocusEffect(
    //     useCallback(() => {
    //       const onBackPress = () => {
    //         // navigation.pop(1); // remove two screens i.e. Document and Camera
    //         // return true // disable normal behaviour

    //             const jumpToAction = DrawerActions.jumpTo('PostListScreen', { name: 'PostListScreen' });
    //             navigation.dispatch(jumpToAction);
    //       };

    //       BackHandler.addEventListener('hardwareBackPress', onBackPress); // detect back button press
    //       return () =>
    //         BackHandler.removeEventListener('hardwareBackPress');
    //     }, [])
    //   );

    const htmlStyles = { p: { fontFamily: 'Lato' } }
    const contentWidth = useWindowDimensions().width;

    return (
        loginData.loginStatus === 'login' ? (

            <>

                {postDetailData !== null ?
                    (
                        <>
                            {/* <HeaderBar title={postDetailData.type == 'bulletin'?'Bulletin Details':'News Details'} headerType="postDetail"
              id={id}  
             postType={postDetailData.type}   icon="document-text-outline" /> */}
 {
                                    isLoadingPost === true ?
                                        (
                                            <Spinner size={60} />) :
                                        (
                                        <>
                            <Header
                                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                                leftComponent={<BackButton screen={screenName} />}
                                centerComponent={<ScreenTitle icon='document-text-outline'
                                    title={screenTitle} />}
                                rightComponent={<DeleteButton id={id} message="Delete Item" postType='post' />}
                                containerStyle={styles.headerBar}
                            />


                            <View style={[styles.container]}>

                                <View style={[styles.content, {
                                    marginHorizontal: 0, paddingVertical: 0, flex: 5
                                    }]}>

                                    <ScrollView style={{ flex: 1, paddingRight: 10 }}>
                                    
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Image style={[styles.image, { flex: 1, height: 100, borderRadius: 2, marginRight: 5 }]}
                                                source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + postDetailData.image }} />
                                            <Text style={[styles.postTitle, { flex: 3, fontWeight: 'bold' }]}>{postDetailData.title}</Text>
                                        </View>
                                    
                                        <View style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: 'silver', marginBottom: 10, paddingVertical: 4
                                            }}>

                                            <Text style={[styles.postTitle, { flex: 3 }]}>{postDetailData.subtitle}</Text>
                                            <Text style={{ fontWeight: 'bold' }}>DATE: {postDetailData.created_at}</Text>

                                            {/* <FlatList
                                                data={postMulImageArray}
                                                renderItem={({ item, index }) =>
                                                    <View style={styles.GridViewContainer}>

                                                        {
                                                            postMulImageArray !== null ?
                                                                (
                                                                    <>
                                                                        <View style={{ borderRadius: 40, padding: 1, flex: 1 }}>

                                                                            <ImageBackground
                                                                                style={[styles.imageThumbnail, { flex: 1, width: width / 4, borderWidth: 1, borderColor: 'silver' }]}
                                                                                source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item }}
                                                                                imageStyle={{ borderRadius: 6 }}
                                                                            >
                                                                            </ImageBackground>
                                                                            
                                                                            <ImageBackground
                                                                            style={[styles.imageThumbnail,{flex:1, width:width/2, borderWidth:1, borderColor:'silver'}]}
                                                                            source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item }}
                                                                            imageStyle={{ borderRadius: 6}}
                                                                            >
                                                                            </ImageBackground>
                                                                
                                                                        </View>
                                                                    </>
                                                                ) : null
                                                        }
                                                    </View>
                                                }
                                                numColumns={4}
                                                keyExtractor={(index) => index.toString()}
                                            /> */}

                                        </View>
                                        

                                      <FlatList
                                                data={postMulImageArray}
                                                renderItem={({ item, index }) =>
                                                    <View style={styles.GridViewContainer}>

                                                        {
                                                            postMulImageArray !== null ?
                                                                (
                                                                    <>
                                                                        <View style={{ borderRadius: 40, padding: 1, flex: 1 }}>

                                                                            <ImageBackground
                                                                                style={[styles.imageThumbnail, { flex: 1, width: width / 3.3,
                                                                                     borderWidth: 1, borderColor: 'silver' }]}
                                                                                source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item.image }}
                                                                                imageStyle={{ borderRadius: 6 }}
                                                                            >
                                                                            </ImageBackground>
                                                                            
                                                                        </View>
                                                                    </>
                                                                ) : null
                                                        }
                                                    </View>
                                                }
                                                numColumns={3}
                                                keyExtractor={(index) => index.toString()}
                                            />


                                        <HtmlReader html={postDetailData.body} youtube={youtube ? youtube : null} />
                                          
                                    </ScrollView>

                                </View>
                            </View>
                                                </>

                                                )
                                        }
                        </>
                    ) : null}
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


    vw: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5e5e5",
        height: 200,
    },
    p: { color: 'red', fontSize: 100, color: 'red' },

    imageThumbnail: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flex: 1,
        height: width / 4,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
    GridViewContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row'
    },

    container: {
        flex: 1,
        paddingLeft: 10,
        paddingTop: 4
    },
    postTitle: {
        fontSize: 20,
        color: 'black',
        textAlign: 'justify'
    },
    content: {
    },
    buttonIcon: {
        width: 28, height: 28, marginBottom: 3, borderRadius: 50, marginRight: 10
        , marginVertical: 8,
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
        flex: 1,
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

export default PostDetailScreen;