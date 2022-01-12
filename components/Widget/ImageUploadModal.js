import React, { useState, useContext, useEffect } from 'react'

import {
    View, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, FlatList, SafeAreaView,
    ScrollView, TouchableOpacity, useWindowDimensions, Linking, ActivityIndicator,
    TouchableRipple, Switch, Animated, Modal
} from 'react-native'

import PostContext from '../Data/PostContext';
import Spinner from './Spinner';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import RNFetchBlob from 'rn-fetch-blob';
import { Picker } from '@react-native-picker/picker';
import GLOBAL from "../Global";
import ImagePicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get('window');


export default function SpinnerModal(props) {
    const { spinnerModalVisible, setSpinnerModalVisible, postId, setPostId, clearData } = useContext(PostContext);


    const { categoryData, storePost, clearPost, loginData, storeBulletin,
        notifyMessage, submit, setSubmit, image, setImage, mulImages, setMulImages,
        isSubmitEnabled, setIsSubmitEnabled, updateImage, setUpdateImage,
        multiImgName, setMultiImgName, btnMoreImage, setBtnMoreImage, savingDataFn,
        savingData, setSavingData,
        mulImageArray, setMulImageArray } = useContext(PostContext);

    const [fileNames, setFileNames] = useState([]);
    const [imageData, setImageData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPickerImage, setIsLoadingPickerImage] = useState(false);
    const spinValue = new Animated.Value(0)

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    const pickSingleBase64 = async (cropit) => {
        ImagePicker.openPicker({
            width: 800,
            height: 800,
            cropping: cropit,
            includeBase64: true,
            includeExif: true,
        })
            .then((image) => {

                var ext = /^.+\.([^.]+)$/.exec(image.path);
                var fileExt = ext[1];
                var d = new Date();
                var timefileName = d.getTime();
                let file = timefileName+'_'+Math.floor(Math.random() * 99)+'.'+fileExt;


                const newupdateImage =  {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    fileName: file
                }

                setIsLoading(true);

                     RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
                      Authorization : "Bearer access-token",
                      otherHeader : "foo",
                      'Content-Type' : 'multipart/form-data'
                      }, 
                      [{ 
                          name : 'avatar', 
                          filename : file, 
                          type:'avatar/'+fileExt,
                          data: image.data,
                        },
                        { name : 'post_id', data : postId},
              
                      ])

                      .then((resp) => {
                          
                        //   alert('img upload data - '+resp.data);
                          
                          setMulImages(mulImages => [...mulImages, newupdateImage]);

                        //   setMulImages([...newMulImages]);
                        //   notifyMessage('Image Uploaded');
                          setIsLoading(false);

                        if(resp.data == 'success'){
                            // var newMulImages = mulImages;
                            // newMulImages.push(newupdateImage);

                            // setMulImages(mulImages => [...mulImages, newupdateImage]);

                            // setMulImages([...newMulImages]);
                            // setMulImages([...newMulImages]);
                            // notifyMessage('Image Uploaded');
                            notifyMessage('Image Uploaded');
                            setIsLoading(false);
                        }else{
                            alert(resp.data);
                            setIsLoading(false);
                            notifyMessage(resp.data+'Something went wrong, Please try again. ')
                        }
                      })
                      .catch((err) => {
                          
                        alert(err);
                        notifyMessage(err+ ' Something went wrong, Please try again. ')
                      })


            })
            
            .catch((e) => alert(e));
    }

    const delMulImageNew = async (index,item, filename) =>{
    
        RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete-unsaved', {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
          { name : 'item', data : filename},
        ])
        .then((resp) => {

          if(resp.data.status == 'success'){
            var newMulImages = mulImages;
            newMulImages.splice(index, 1);
            setMulImages([...newMulImages]);
            var newFileNames = fileNames;
            newFileNames.splice(index, 1);
            setFileNames([...newFileNames]); 
            notifyMessage(+ resp.data);
          }else{
              notifyMessage('del --' + resp.data);
          }

        }).catch((err) => {
          alert('eerr--' +JSON.stringify(err));
        })
    
      }
    

    const finalMulImageUpload = (cropit) => {
        // alert('uploaded');
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
                    var newFileName = i.path.substring(i.path.lastIndexOf('/') + 1);
                    var filepath = i.path.substring(0, i.path.lastIndexOf("/"));
                    var ext = /^.+\.([^.]+)$/.exec(i.path);
                    var fileExt = ext[1];

                    var file = multiImgName + '_' + Math.floor(Math.random() * 99) + '.' + fileExt;

                    return {
                        uri: i.path,
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                        fileName: file,
                        fileData: i.data
                    };
                })


                var i = 0;
                for (i; i < imageData.length; i++) {

                    var newMulImages = mulImages;
                    newMulImages.push(imageData[i]);


                    var ext = /^.+\.([^.]+)$/.exec(newMulImages[0].uri);
                    var fileExt = ext[1];

                   

                    var newFileNames = fileNames;
                    newFileNames.push(imageData[i]);

                }

                setMulImages([...newMulImages]);
                setFileNames([...newFileNames]);

                var d = new Date();
            })
    }


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Animated.View
                            animation="bounceIn"
                            style={{
                                alignItems: 'center', alignContent: 'center',

                            }}>

                            <Text style={styles.modalText}>{props.spinnerText}</Text>
                            <View style={[styles.container,{height:400}]}>

                                <TouchableOpacity
                                    onPress={() => {setSpinnerModalVisible(false);  setBtnMoreImage(true);}}
                                    style={[styles.closeButton, {  backgroundColor: 'black',alignItems:'center', justifyContent:'center' }]}
                                >

                                <Text style={{backgroundColor: 'black', color:'white', fontWeight:'bold',
                                 }}>X</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => pickSingleBase64()}
                                    style={[styles.imgButton, {  backgroundColor: 'whitesmoke', }]}
                                >
                                    {/* setIsLoadingPickerImage */}

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
                                            <Text style={styles.imageBtnText}>Select Images </Text>
                                        </>
                                        )}
                                </TouchableOpacity>




                                <View style={{flex:1, flexDirection:'column', justifyContent: 'center',height:100}}>
                                        
                                <SafeAreaView style={{ flex: 1, height:100 }}>
                                            <FlatList
                                                data={mulImages}
                                                keyExtractor={(item) => item.fileName}
                                                numColumns={3}     

                                                renderItem={({ item, index }) =>
                                                    <View style={[styles.GridViewContainer]}
                                                    >
                                                        <>
                                                            <View style={{ borderRadius: 40, width: width / 3.3, padding: 4 }} key={item.fileName}>
                                                                
                                                            <ImageBackground
                                                                    style={[styles.imageThumbnail, { borderWidth: 1, borderColor: 'silver' }]}
                                                                    source={{ uri: item.uri }}
                                                                    imageStyle={{ borderRadius: 6 }}
                                                                    key={item.fileName}
                                                                >
                                                            <TouchableOpacity 
                                                                style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'white', borderRadius: 4 }}
                                                                onPress={() => delMulImageNew(index, item, item.fileName)}
                                                                
                                                                >
                                                                    
                                                                    <Ionicons
                                                                        name="trash-sharp"
                                                                        color={GLOBAL.COLOR.DARK}
                                                                        size={24}
                                                                        key={index}
                                                                        onPress={() => delMulImageNew(index, item, item.fileName)}
                                                                    />
                                                                </TouchableOpacity>
                                                                </ImageBackground>
                                                            </View>
                                                        </>

                                                    </View>}
                                            />
                                        </SafeAreaView >
                                        
                            </View>
                            
                        <TouchableOpacity style={[styles.btnSubmit, styles.btnSubmitEnable]}
                            onPress={() => {[clearData('bulletin'), setBtnMoreImage(false), savingDataFn()]}}
                        >

                            {savingData == true ?
                            (<>
                                <ActivityIndicator size={40} color='black' />
                                <Text style={styles.imageBtnText}>Saving Bulletin</Text>
                            </>
                            ) : (
                            <>
                                <Ionicons name="save-outline"
                                color="white"
                                size={30}
                                />
                                <Text style={styles.btnSubmitText}> Save & Close</Text>
                            </>
                            )}

                        </TouchableOpacity>
                        
                            </View>
                        </Animated.View>
                    </View>
                </View>

            </Modal>

        </>
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

    container: {
        height: 80,
        paddingTop: 4,
        marginTop: 10,
        width: '80%',
        paddingBottom:0
    },

    spanText: {
        color: 'red',
      },
      imageBtnText: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        alignSelf: 'center',
        color:'black'
      },
    

  btnSubmit: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    bottom:-40,
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

    imageThumbnail: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flex: 1,
        height: 70,
        width: 70,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
      },
      closeButton: {
          height: 50,
          position:'absolute',
          top:-70,
          right:-20,
          alignContent: 'center',
          textAlign:'center',
          padding: 5,
          width: 30,
          height: 30,
          flexDirection: 'row',
          borderRadius: 3,
          borderWidth: 1,
          borderColor: 'silver',
          marginBottom: 4
      },

      imgButton: {
        height: 50,
        backgroundColor: 'silver',
        alignContent: 'center',
        padding: 5,
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'silver',
        marginBottom: 4
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

    GridViewContainer: {
        backgroundColor: 'white',
        flex: 1,
    
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
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: "white",
        borderRadius: 5,
        height: height / 1.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    },
    modalText: {

        color: "black",
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
    }
})