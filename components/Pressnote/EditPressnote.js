import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
    View, CheckBox, Text, StyleSheet, TextInput, Image, Dimensions, FlatList, SafeAreaView,
    ScrollView, TouchableOpacity, ImageBackground,
    TouchableRipple, Switch, ActivityIndicator
} from 'react-native'

import { Picker } from '@react-native-picker/picker';

import { Container, Header, Content, Textarea, Form, Item, Input, Button, Label } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderBar from '../Header/HeaderBar'
import { useNavigation } from '@react-navigation/native';
import GLOBAL from '../Global';
import SpinnerModal from '../Widget/SpinnerModal';

import Spinner from '../Widget/Spinner';
import Login from '../Auth/Login';


const EditPressnote = ({ props, route }) => {

    const { id, category_id, title, subtitle, youtube, body, slug, image, mul_images, status } = route.params.item;

    const [isLoading, setIsLoading] = useState(false);

    const {categoryData, notifyMessage, setMulImages, updateImage, setUpdateImage, setMultiImgName,
        loginData,  update, setUpdate, setIsUpdateEnabled, updatePressnote, multiImgName,
        spinnerModalVisible,setSpinnerModalVisible,  mulImageArray, setMulImageArray, mulArray, setMulArray } = useContext(PostContext);


    const navigation = useNavigation();
    const [selected, setSelected] = useState('');
    const [updatedImg, setUpdatedImg] = useState('');

    const [isUpdateStatusEnabled, setIsUpdateStatusEnabled] = useState(status == 1 ? true : false);

    const toggleSwitch = () => {
        setUpdate({
            id: update.id, category: update.category, title: update.title, subtitle: update.subtitle, youtube: update.youtube,
            slug: update.slug, body: update.body,
            image: update.image, status: !update.status
        });
    };


    const spinner = () => {
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    }

    const ImageList = (props) => {
        return (
            <View style={styles.GridViewContainer}>
                {

                    props.data.uri !== null ?
                        (<Image
                            style={[styles.imageThumbnail, { width: 100 }]}
                            source={{ uri: props.data.uri }}
                        />) : null
                }
            </View>
        )
    }


    const checkUpdateBtn = () => {

        if ((Array.isArray(image) || image.length === 0 || update.category === '' || update.category === null ||
            update.title === '' || update.subtitle === ''
            || update.body === '' || update.slug === '')) {
            // alert(image.length);
            alert(image.length + 'All Field are Required');
            setIsUpdateEnabled(false);

        } else {
            // alert('not null');
            alert(image.length + 'All Field are Required');
            setIsUpdateEnabled(true);
        }

    }

    const changeCategory = (e) => {


        setUpdate({...update, category: e});

    }
    const changeTitle = (e) => {
        
        setUpdate({...update, title: e});

    }
    const changeSubHeading = (e) => {    
        setUpdate({...update, subtitle: e});
    }


    const changeYoutube = (e) => {
        setUpdate({
            id: update.id,
            category: update.category, title: update.title, subtitle: update.subtitle, youtube: e, slug: update.slug,
            body: update.body, image: update.image, status: update.status
        });

        // checkUpdateBtn();
    }


    const changeBody = (e) => {

        setUpdate({
            id: update.id, category: update.category, title: update.title, subtitle: update.subtitle, youtube: update.youtube, slug: update.slug,
            body: e, image: update.image, status: update.status
        });
        // checkUpdateBtn();

    }
    const changeSlug = (e) => {
        setUpdate({ id: update.id, category: update.category, title: update.title, subtitle: update.subtitle, youtube: update.youtube, slug: e, body: update.body, image: update.image, status: update.status });
        // checkUpdateBtn();

    }
    const changeStatus = (e) => {
        setUpdate({ id: update.id, category: update.category, title: update.title, subtitle: update.subtitle, youtube: update.youtube, slug: e, body: update.body, image: update.image, status: update.status });
        // checkUpdateBtn();

    }



    const delMulImageNew = (index, item) => {

        var array = [...mulArray];
        array.splice(index, 1);
        setMulArray(array);

        var array2 = [...mulImageArray];
        array2.splice(index, 1);
        setMulImageArray(array2);

        RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/pressnote/mob-media-delete', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'id', data: id.toString() },
            { name: 'item', data: item },
            { name: 'mul_images', data: array.toString() },
        ])
            .then((resp) => {
                notifyMessage(resp.data);

            }).catch((err) => {
                alert(JSON.stringify(err));

            })


    }


    const pickMultipleBase64 = (cropit) => {

        let fileArray = [];
        ImagePicker.openPicker({
            multiple: true,
            width: 800,
            height: 800,
            cropping: cropit,
            includeBase64: true,
            includeExif: true,
        })
            .then((images) => {
                const imageData = images.map((i) => {
                    return {
                        uri: i.path,
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                    };
                })

                setIsLoading(true);
                
                setMulImages(imageData);
                
                var d = new Date();
                let i = 0;
                
                for (i = 0; i < images.length; i++) {
                    var ext = /^.+\.([^.]+)$/.exec(images[0].path);
                    var fileExt = ext[1];
                    
                    let file = multiImgName + '_' + Math.floor(Math.random() * 99) + i + '.' + fileExt;
                    fileArray.push(file);                        
                    if (images.length - 1 === i) {
                        notifyMessage('Files uploaded');
                    }

                    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/test-multiple', {
                        Authorization: "Bearer access-token",
                        otherHeader: "foo",
                        'Content-Type': 'multipart/form-data'
                    }, [
                        {
                            name: 'avatar',
                            filename: file,
                            type: 'avatar/' + fileExt,
                            data: images[i].data,
                        },


                    ]).then((resp) => {
                    setIsLoading(false);
                        
                        setMulArray(fileArray.concat(mulArray));

                    }).catch((err) => {

                        alert(JSON.stringify('errr00 = ' + JSON.stringify(err)));
                    })
                }

            })
    }



    useEffect(() => {
        setUpdate({
            id: id, category: category_id, title: title, subtitle: subtitle, slug: slug, body: body, youtube: youtube,
            image: route.params.item.image, status: route.params.item.status == 1 ? true : false, admin_id: 1
        });

        if (mul_images == null || mul_images == '') {
            setMulArray([]);
        } else {
            const mulArrayTemp = mul_images.split(",");
            setMulArray(mulArrayTemp);
        }

        var d = new Date();
        var timefileName = d.getTime();
        setMultiImgName(timefileName);
        setSpinnerModalVisible(false);
        setUpdateImage([]);
        setIsUpdateEnabled(true);
    }, [id]);



    return (
        loginData.loginStatus === 'login' ? (
            <>

                {spinnerModalVisible ?
                    (
                        <>
                            <SpinnerModal spinnerText="Saving New Bulletin..." />
                        </>
                    ) : null}
                <Container style={styles.container}>
                    <HeaderBar title="Edit Pressnote" headerType="createBulletin" icon="document-text-outline" />
                    <Content>
                        <Form style={styles.formContainer}>

                            <View style={styles.item}>
                                <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Category</Label>
                                <View style={styles.textAreaContainer}>


                                    
              <Picker
                  mode="dropdown"
                  style={{height: 50, width: '100%'}}
                  selectedValue={update.category}
                  onValueChange={(e) => changeCategory(e)}
              >

              <Picker.Item label="Please Select Category" key={0} value={null} />
                {
                categoryData.map((category) => {
                  return (
                    
                    <Picker.Item label={category.name} key={category.id} value={category.id} />
                  
                    )
                })
              }
              </Picker>

                                </View>
                            </View>

                            <View style={styles.item}>
                                <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Title</Label>
                                <View style={styles.textAreaContainer}>
                                    <Input
                                        name="title"
                                        multiline={true}
                                        onChangeText={(e) => changeTitle(e)}
                                        defaultValue={update.title}
                                        style={styles.textArea} rowSpan={5} bordered placeholder="Titlte of bulletin" />
                                </View>
                            </View>

                            <View style={styles.item}>
                                <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Sub Heading</Label>
                                <View style={styles.textAreaContainer}>
                                    <Input
                                        multiline={true}
                                        defaultValue={update.subtitle}
                                        onChangeText={(e) => changeSubHeading(e)}
                                        style={styles.textArea} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{
                                flex: 1, marginTop: 10,
                                }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <TouchableOpacity
                                    onPress={() => pickMultipleBase64()}
                                    style={[styles.imgButton, { flex: 0.5, backgroundColor: 'whitesmoke', }]}
                                    >
                                    {isLoading == true ?
                                        (<>

                                        <ActivityIndicator size={40} color='black' />
                                        <Text style={styles.imageBtnText}>Uploading...</Text>
                                        </>
                                        ) : (<>
                                        <Ionicons name="ios-images-outline"
                                            color="black"
                                            size={32}
                                        />
                                        <Text style={styles.imageBtnText}>   More Images</Text>
                                        </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>

                            
                            


                            {mulArray !== null ? (
                                <SafeAreaView style={{ flex: 1 }}>
                                    <FlatList
                                        data={mulArray}
                                        renderItem={({ item, index }) =>
                                            <View style={styles.GridViewContainer}>
                                                {
                                                    mulArray !== null ?
                                                        (
                                                            <>
                                                                <View style={{ borderRadius: 40, padding: 4 }}>
                                                                    <ImageBackground
                                                                        style={[styles.imageThumbnail, { width: width / 4.4, borderWidth: 1, borderColor: 'silver' }]}
                                                                        source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item }}
                                                                        imageStyle={{ borderRadius: 6 }}
                                                                        key={index}
                                                                    >
                                                                        <Ionicons
                                                                            style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: '#ffffffc7', borderRadius: 4 }}
                                                                            name="trash-sharp"
                                                                            color={GLOBAL.COLOR.DARK}
                                                                            size={24}
                                                                            key={index}
                                                                            onPress={() => delMulImageNew(index, item)}
                                                                        />
                                                                    </ImageBackground>
                                                                </View>
                                                            </>
                                                        ) : null
                                                }

                                            </View>}
                                        numColumns={4}
                                    />
                                    
                                </SafeAreaView >
                            ) : null
                            }


                            <View style={[styles.item, { alignContent: 'center', justifyContent: 'space-around' }]}>
                                <Label style={styles.labelStyle}><Text style={[styles.spanText, { marginRight: 50 }]}>* </Text>Status</Label>

                                <Switch
                                    trackColor={{ false: "silver", true: 'silver' }}
                                    thumbColor={isUpdateStatusEnabled ? GLOBAL.COLOR.DARK : GLOBAL.COLOR.DARK}
                                    ios_backgroundColor={GLOBAL.COLOR.LIGHT}
                                    onValueChange={() => toggleSwitch()}
                                    value={update.status}
                                />
                            </View>
                            {
                                route.params.item.admin !== null?(
                                <Label style={[styles.labelStyle, {marginBottom:15}]}>
                                <Text style={[styles.spanText,{color:'black', marginRight:50}]}>Written By:-</Text>
                                <Text style={{color:'gray'}}>{route.params.item.admin.name}</Text></Label>
                                ):null
                            }
                            
                            <View style={styles.item}>
                                    <TouchableOpacity style={ [styles.btnSubmit, styles.btnSubmitEnable]}
                                        onPress={() => updatePressnote()}
                                        disabled={isLoading == true ? true : false}
                                    >
                                       
                                        
                                    {isLoading == true ?
                                        (<>
                                        
                                            <ActivityIndicator size={36} color='white' />
                                            <Text style={{color:'white'},[styles.btnSubmitText]}>  Image Uploading...</Text>
                                        </>)
                                        :
                                        (<>
                                            <Ionicons name="save-outline"
                                                color="white"
                                                size={30}
                                            />
                                            <Text style={styles.btnSubmitText}>  Submit Data</Text>
                                        </>)
                                        }
                                    </TouchableOpacity>

                                <Container>

                                </Container>


                            </View>



                        </Form>
                    </Content>
                </Container>
            </>
        ) :
            (<Login />)
    )




}

const styles = StyleSheet.create({
    btnSubmit: {
        alignItems: 'center',
        padding: 14,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    btnSubmitEnable: {
        backgroundColor: GLOBAL.COLOR.DARK,
    },
    btnSubmitDisable: {
        backgroundColor: 'gray',
        color: 'black'
    },
    btnSubmitText: {
        color: 'white',
        fontSize: 19,
        textTransform: 'uppercase'

    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row'

    },

    textAreaContainer: {
        borderColor: 'silver',
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        marginVertical: 6,
        backgroundColor: 'whitesmoke',
    },

    imageThumbnail: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flex: 1,
        height: 100,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
    },

    spanText: {
        color: 'red',
    },
    imageBtnText: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        alignSelf: 'center'
    },
    imgButton: {
        backgroundColor: 'silver',
        alignContent: 'center',
        padding: 5,
        width: 200,
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'silver',
        marginBottom: 4

    },
    item: {
        marginBottom: 4
    },
    textArea: {
        fontSize: 18,
        height: 90,
        marginVertical: 2,
    },
    labelStyle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '700'
    },
    formContainer: {
        padding: 12,
    },
    formItem: {
        marginBottom: 4
    },
    inputStyle: {

        fontSize: 18,
        color: '#333',
    },

    container: {
        flex: 1,
        paddingTop: 4,
        marginTop: 10,
    },
    postTitle: {
        fontSize: 20,
        color: 'black',
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

export default EditPressnote;