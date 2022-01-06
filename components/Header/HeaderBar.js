import React, { useState, useContext } from "react";
import {
    Alert, Modal, Button, AppRegistry, Image,
    StyleSheet, View, TouchableHighlight,
    Dimensions
} from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { Searchbar } from 'react-native-paper'
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';

import SpinnerModal from '../Widget/SpinnerModal';
import PostContext from '../Data/PostContext';
import Ionicons from 'react-native-vector-icons/Ionicons'

import BulletinListScreen from '../Bulletin/BulletinListScreen';


// import PostDeleteModel from '../Posts/PostDeleteModel';
// const GLOBAL = require('../Global');
import GLOBAL from "../Global";


const { width, height } = Dimensions.get('window');

export const ScreenTitle = (props) => {
    return (
        <><Text style={[styles.headerBarText]}>
            <Ionicons name={props.icon} size={24} /> {props.title}</Text>
        </>
    )
}
export const LeftMenu = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }
    return (
        <>
            <Ionicons name="menu" size={25}
                backgroundColor="black"
                color='white'
                onPress={() => navigation.openDrawer()}
            ></Ionicons>
        </>
    )
}

export const BackButton = (props) => {
    const navigation = useNavigation();
    const { postData, intervalReq, setIntervalReq, postDetailData, setPostDetailData, setPostData,
        notifyMessage
    } = useContext(PostContext);

    return (
        <>
            <Ionicons name="chevron-back-outline" size={20}
                color='white'
                onPress={() => navigation.navigate(props.screen)}
            >Back</Ionicons>
        </>
    )
}



export const DeleteButton = (props) => {
    const navigation = useNavigation();

    const { modalVisible, setModalVisible, postData, setPostData, postListData, setPostListData, getJsonData,
         delPost, delPressnote,
        bulletinListData, setBulletinListData, notifyMessage, isDeleting, setIsDeleting } = useContext(PostContext);

    // const delPost = (id) => {
    //     setIsDeleting(true);
    //     const formData = new FormData();
    //     formData.append('id', id);
    //     axios.post(GLOBAL.BASE_URL + 'api/post/del-post', formData)
    //         .then(res => {
    //             // alert(JSON.stringify(res.data));
    //             if (res.data.status === 0) {
    //                 setPostData(res.data.postsTop);
    //                 setPostListData(res.data.posts);
    //                 setBulletinListData(res.data.bulletins);

    //                 if (props.postType === 'bulletin') {
    //                     // navigation.navigate('BulletinListScreen');
    //                     navigation.goBack();
    //                     notifyMessage('Bulletin Deleted Succefully...');
    //                     setIsDeleting(false);

    //                 }
    //                 else if (props.postType === 'news') {
    //                     // navigation.navigate('PostListScreen');
    //                     navigation.goBack();
    //                     notifyMessage('News Deleted Succefully...');
    //                     setIsDeleting(false);

    //                 }
    //                 else if (props.postType === 'popular') {
    //                     navigation.goBack();
    //                     // navigation.navigate('PostListScreen');
    //                     notifyMessage('Popular News Deleted Succefully...');
    //                     setIsDeleting(false);

    //                 }
    //                 setModalVisible(!modalVisible);

    //             } else {
    //                 //   alert('not deleted');

    //                 alert(JSON.stringify(res.data.status));

    //                 setModalVisible(!modalVisible);
    //                 setPostData(res.data.postsTop);
    //                 setPostListData(res.data.posts);
    //                 setBulletinListData(res.data.bulletins);
    //             }
    //         })
    //         .catch(err => {
    //             alert('Server Error - ' + err);
    //         })
    // }

    const delPostModal = (id) =>{
        Alert.alert("Delete Post!", "Are you sure you want to close?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },     
             { text: "YES", onPress: () => {delPost(id); navigation.navigate('BulletinListScreen')} }
          ]
          
          );
          return true;
        }

        
    const delPressnoteModal = (id) =>{
        Alert.alert("Delete Pressnote!", "Are you sure you want to close?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },     
             { text: "YES", onPress: () => [delPressnote(id), navigation.goBack()] }
          ]
          
          );
          return true;
        }
    

    return (
        <>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {isDeleting ?
                            (<>
                                <SpinnerModal spinnerText="Deleting Artical..." />
                            </>
                            ) : (
                                <>
                                    <Text style={styles.modalText}>Are you sure want to delete this post?</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: GLOBAL.COLOR.DARK }}
                                            onPress={() => {delModal(props.id)}}
                                        >
                                            <Text style={styles.textStyle}><Ionicons name="trash-outline" size={22} /> DELETE</Text>
                                        </TouchableHighlight>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: GLOBAL.COLOR.BLACK, }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}><Ionicons name="close" size={22} /> CANCEL</Text>
                                        </TouchableHighlight>
                                    </View>
                                </>
                            )
                        }

                    </View>
                </View>
            </Modal> */}

            
        {isDeleting ?
            (<>
                <SpinnerModal spinnerText="Deleting Artical..." />
            </>
            ) : (
                <>
                <Ionicons name="trash-outline" size={24}
                    style={{
                        color: 'red', backgroundColor: 'white',
                        padding: 1, borderRadius: 5
                    }}
                    color='white'
                    // onPress={() => {setModalVisible(true)}}
                    

                            onPress={() => {
                                
                    
                                props.postType=='post'?(
                                    delPostModal(props.id)
                                ):(
                                    delPressnoteModal(props.id)

                                )
                            }}


                ></Ionicons>
            </>
            )}


        </>
    )
}


const HeaderBar = (props) => {

    //  alert(props.postType);
    if (props.headerType === 'dashboardWithMenu') {
        return (
            <>
                <Header
                    statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                    leftComponent={<LeftMenu />}
                    centerComponent={<ScreenTitle icon={props.icon} title={props.title} />}
                    // rightComponent={{ type :'ionicon', icon: 'ios-ellipsis-vertical-sharp', color: 'white' ,size:25}}
                    containerStyle={styles.headerBar}
                />
            </>
        )
    }
    else if (props.headerType === 'postList') {
        return (
            <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<LeftMenu />}
                centerComponent={<ScreenTitle icon={props.icon} title={props.title} />}
                // rightComponent={{ type :'ionicon', icon: 'cart', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />
        )
    }
    else if (props.headerType === 'createBulletin') {
        return (
            <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<LeftMenu />}
                centerComponent={<ScreenTitle icon={props.icon} title={props.title} />}
                // rightComponent={{ type :'ionicon', icon: 'ios-ellipsis-vertical-sharp', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />
        )
    }

    else if (props.headerType === 'postDetail') {
        return (
            <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<BackButton />}
                centerComponent={<ScreenTitle icon={props.icon} title={props.title} />}
                rightComponent={<DeleteButton id={props.id} postType={props.postType} />}
                containerStyle={styles.headerBar}
            />
        )
    }

}

export default HeaderBar;


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

    // Delete Style
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0000009e'
    },
    modalView: {
        margin: 4,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        width: width / 1.2,
        height: 180,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginHorizontal: 4,
        flex: 2, alignItems: 'center', justifyContent: 'center',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
    }
})