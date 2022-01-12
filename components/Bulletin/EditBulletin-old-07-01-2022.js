import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
  View, Text, StyleSheet, TextInput, Image, Dimensions, FlatList, SafeAreaView, BackHandler,
  ScrollView, TouchableOpacity, useWindowDimensions, Linking, ImageBackground,
  TouchableRipple,  Switch, ActivityIndicator
} from 'react-native'

import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';


// import {} from '../../assets/no-img-xs.png';

import { Container, Header, Content, Textarea, Form, Item, Input, Button, Label } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

// import {TextInput} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HTML from "react-native-render-html";
import HtmlReader from '../Html/HtmlReader';
import HeaderBar from '../Header/HeaderBar'
import { useNavigation } from '@react-navigation/native';
import GLOBAL from '../Global';
import SpinnerModal from '../Widget/SpinnerModal';

import Spinner from '../Widget/Spinner';
import Login from '../Auth/Login';


const EditBulletin = ({ props, route }) => {

  const { id, category_id, title, subtitle, youtube, body, slug, image, mul_images, status } = route.params.item;
  

  const [isLoading, setIsLoading] = useState(false);


  const { categoryData, notifyMessage, setMulImages, updateImage, setUpdateImage,
    loginData, update, setUpdate, isUpdateEnabled, setIsUpdateEnabled, updatePost, updatePostNoImage, multiImgName,
    spinnerModalVisible, setSpinnerModalVisible, mulImageArray, setMulImageArray, mulArray, setMulArray } = useContext(PostContext);


  const navigation = useNavigation();

  const [selected, setSelected] = useState('');
  const [updatedImg, setUpdatedImg] = useState('');
  
  const [isUpdateStatusEnabled, setIsUpdateStatusEnabled] = useState(status == 1?true:false);

  const toggleSwitch = () => {
    setUpdate({...update, status:!update.status})
  };


  const spinner = () => {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  }


  const backAction = () => {
    alert('ggg');
    // navigation.dispatch(popAction);
    navigation.navigate("BulletinListScreen");
    return true;
};


  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      includeBase64: true,
    })
      .then((imageData) => {
        let newFile = {
          uri: imageData.path,
          type: `test/${imageData.path.split(".")[1]}`,
          name: `test.${imageData.path.split(".")[1]}`
        }
        var ext = /^.+\.([^.]+)$/.exec(imageData.path);
        var fileExt = ext[1];


        // const newImage = { uri:  imageData.path, width: imageData.width, height: imageData.height };
        setUpdateImage(imageData);
       
        console.log(JSON.stringify(update.image.path));
        // setUpdateImage(image);

        setUpdateImage(imageData);


      })
      .catch((e) => alert('errr parent ' + e));
  }

  const pickMultiple = () => {

    // const [images, setImages] = useState([]);
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
  cropping: true
    })
      .then((images) => {

        const imagData = images.map((i) => {
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          };
        })

        setMulImages(imagData);

      })
      .catch((e) => alert(e));
  }

  const pickSingleBase64 = (cropit) => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then((image) => {
        const newupdateImage = { uri: `data:${updateImage.mime};base64,` + updateImage.data, width: updateImage.width, height: updateImage.height };
        setUpdateImage(image);

      })
      .catch((e) => alert(e));
  }

  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {

        const newImages = { uri: null, width: null, height: null, mime: null };
        setImasetUpdateImagege(newImages);
        setMulImages(newImages);

      })
      .catch((e) => {
        alert(e);
      });
  }



  const checkUpdateBtn = () => {

    if ((Array.isArray(image) || image.length === 0 || update.category === '' || update.category === null ||
        update.title === '' || update.subtitle === ''
      || update.body === '' || update.slug === '')) {
      // alert(image.length);
      alert(image.length+'All Field are Required');
      setIsUpdateEnabled(false);

    } else {
      // alert('not null');
      alert(image.length+'All Field are Required');
      setIsUpdateEnabled(true);
    }

  }

  const changeCategory = (e) => {

    setUpdate({
      id: update.id, category: e, title: update.title, subtitle: update.subtitle, youtube: update.youtube, slug: update.slug, body: update.body,
      image: update.image, status: update.status
    });
    // alert(update.category);
    // checkUpdateBtn();
  }
  const changeTitle = (e) => {
    setUpdate({ id: update.id, category: update.category, title: e, subtitle: update.subtitle, youtube: update.youtube, slug: update.slug, body: update.body, image: update.image, status: update.status });
    // checkUpdateBtn();
  }
  const changeSubHeading = (e) => {
    setUpdate({ id: update.id, category: update.category, title: update.title, subtitle: e, youtube: update.youtube,
       slug: update.slug, body: update.body,
       image: update.image, status: update.status });
    // checkUpdateBtn();
  }
  
  
  const changeYoutube = (e) => {
    setUpdate({ id: update.id,
      category: update.category, title: update.title, subtitle: update.subtitle, youtube: e, slug: update.slug,
       body: update.body, image: update.image, status: update.status
    });

    // checkUpdateBtn();
  }


  const changeBody = (e) => {
    
    setUpdate({ id: update.id, category: update.category, title: update.title, subtitle: update.subtitle, youtube: update.youtube, slug: update.slug,
       body: e, image: update.image, status: update.status });
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
  


const delMulImageNew = (index,item) =>{  
  var array = [...mulArray]; 
  array.splice(index, 1);
  setMulArray(array);
  

  var array2 = [...mulImageArray]; 
  array2.splice(index, 1);
  setMulImageArray(array2);

  // alert(mulArray);
  
  RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete', {
    Authorization: "Bearer access-token",
    otherHeader: "foo",
    'Content-Type': 'multipart/form-data',
  }, [
    { name : 'id', data : id.toString()},
    { name : 'item', data : item},
    { name : 'mul_images', data : array.toString()},
  ])
  .then((resp) => {
    notifyMessage(resp.data);
  }).catch((err) => {
    notifyMessage('Something Went wrong, while deleting image.');
    // alert(JSON.stringify(err));
    
  })
}


const uploadImages2 = (cropit) => {
// alert(mulArray);

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
          console.log(images);

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
  
  const uploadSingleImg = (cropit) => {
    // alert('single');
    ImagePicker.openPicker({
      multiple: false,
      width: 800,
      height: 800,
      cropping: false,
      includeBase64: true,
      includeExif: true,
    })
      .then((image) => {
        setIsLoading(true);
          var d = new Date();
          let i = 0;
          var ext = /^.+\.([^.]+)$/.exec(image.path);
          var fileExt =  ext[1];
          
          var timefileName = d.getTime();
          let file = timefileName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
          
          RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data'
            }, [
            { 
            name : 'avatar', 
            filename : file, 
            type:'avatar/'+fileExt,
            data: image.data,
            },
                
            ]).then((resp) => {
              notifyMessage(JSON.stringify(resp.data));
              
            mulArray.push(file);
            setIsLoading(false);
            setMulArray(mulArray);
            
            
            setMulImageArray(mulArray.toString());
            // alert(mulImageArray);
            }).catch((err) => {
            
            // alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
            setIsLoading(false);
            })
 
      })
      
      .catch((e) => {
        notifyMessage('Failed... Please Upload Again.')
        
          setIsLoading(false);
        }

        );
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

    setMulImages(imageData);

    var d = new Date();
    let i = 0;
    for(i = 0; i< images.length; i++)
    {
    var ext = /^.+\.([^.]+)$/.exec(images[0].path);
    var fileExt =  ext[1];
    let file = multiImgName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
    
    fileArray.push(file);
    
    setMulImageArray(fileArray.toString());
    
    
    if(images.length-1 === i){
      notifyMessage('uploaded');
    }
    
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data'
    }, [
    { 
    name : 'avatar', 
    filename : file, 
    type:'avatar/'+fileExt,
    data: images[i].data,
    },
    
    
    ]).then((resp) => {
      alert(JSON.stringify(resp.data));
      
    alert('f arr - '+fileArray);
      
    }).catch((err) => {
    
    alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
    })}
 
    })
    
    
    }

    const getHeader = () => {
      return <Text>{'My Title'}</Text>;
  };

  const getFooter = () => {
      return <Text>{'Loading...'}</Text>;
  };
  

  useEffect(() => {
    
    BackHandler.removeEventListener("hardwareBackPress", backAction);
    
    setUpdate({
      id: id, category: category_id, title: title, subtitle: subtitle, slug: slug, body: body, youtube:youtube,
      image: route.params.item.image, status: route.params.item.status==1?true:false, admin_id: 1
    });

    if(mul_images == null || mul_images == ''){ 
      setMulArray([]);
    }else{ 
      // alert(mul_images);
      const mulArrayTemp = mul_images.split(",");
      setMulArray(mulArrayTemp);
    }
    setSpinnerModalVisible(false);
    setUpdateImage([]);
    setIsUpdateEnabled(true);


  }, [id]);



  return (
    loginData.loginStatus === 'login'?(
    <>

      {spinnerModalVisible ?
        (
          <>
            <SpinnerModal spinnerText="Saving New Bulletin..." />
          </>
        ) : null}
        
      <Container style={styles.container}>
        <HeaderBar title="Edit Bulletin" headerType="createBulletin" icon="document-text-outline" />
        <Content>
          <View style={{ flex: 1, flexDirection: 'row', height: 160, justifyContent: 'center' }}>
            <View style={{ flex: 1, margin: 10, }}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Main Image</Text>

              <Image
                source={updateImage.path ? { uri: updateImage.path } : { uri: GLOBAL.BASE_URL + `web/media/xs/` + route.params.item.image }}
                style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
              />

              
            </View>
            <View style={{
              flex: 2,
              alignItems: 'center', marginTop: 10
            }}>

              <TouchableOpacity
                onPress={() => pickSingleBase64(false)}
                style={[styles.imgButton, { backgroundColor: 'whitesmoke', }]}
              >

                <Ionicons name="ios-images-outline"
                  color="black"
                  size={32}
                />
                <Text style={styles.imageBtnText}>Open Images</Text>
              </TouchableOpacity>



              {/* <TouchableOpacity
          onPress={() => cleanupImages()}
          style={styles.button}
        >
          <Text style={styles.text}>Cleanup All Images</Text>
        </TouchableOpacity> */}


              <TouchableOpacity
                onPress={() => pickSingleWithCamera(true)}
                style={styles.imgButton}
              >
                <Ionicons name="md-camera-outline"
                  color="black"
                  size={32}
                />

                <Text style={styles.imageBtnText}>Capture Image</Text>
              </TouchableOpacity>
              
            <TouchableOpacity
                onPress={() => uploadImages2(false)}
                style={[styles.imgButton,{backgroundColor: 'whitesmoke',}]}
                >
                    {isLoading == true?
                    (<>
                    
                <ActivityIndicator size={40} color='black' />  
                <Text style={styles.imageBtnText}>Uploading...</Text>
                </>
                ):(<>
                    <Ionicons name="ios-images-outline"
                            color="black"
                            size={32}
                            />
                <Text style={styles.imageBtnText}>More Images</Text>
                </>
                )}

                </TouchableOpacity>

            </View>
          </View>

          <Form style={styles.formContainer}>
         
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
                  onChangeText={(e) => setUpdate({...update, title:e})}
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
                  onChangeText={(e) => setUpdate({...update, subtitle:e})}
                  style={styles.textArea} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
              </View>
            </View>

            
            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}></Text>Youtube Video</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                editable= {true}
                  defaultValue={update.youtube}
                  onChangeText={(e) => setUpdate({...update, youtube:e})}
                  style={styles.textArea} rowSpan={5} bordered placeholder="Youtube Link" />
              </View>
            </View>


            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Body</Label>
              <View style={styles.textAreaContainer}>
                <Input
                  multiline={true}
                  onChangeText={(e) => setUpdate({...update, body:e})}
                  defaultValue={update.body}
                  style={[styles.textArea, { height: 150 }]} rowSpan={5} bordered placeholder="Buletin Body Details..." />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Slug</Label>
              <View style={styles.textAreaContainer}>
                <Input
                  multiline={true}
                  onChangeText={(e) => setUpdate({...update, slug:e})}
                  defaultValue={update.slug}
                  style={[styles.textArea, { height: 80 }]} rowSpan={5} bordered placeholder="Url Slug" />
              </View>
            </View>

      <View style={[styles.item,{alignContent:'center', justifyContent:'space-around'}]}>
        <Label style={styles.labelStyle}><Text style={[styles.spanText,{marginRight:50}]}>* </Text>Status</Label>
        
        <Switch
          trackColor={{ false: "silver", true: 'silver' }}
          thumbColor={isUpdateStatusEnabled ? GLOBAL.COLOR.DARK : GLOBAL.COLOR.DARK}
          ios_backgroundColor= {GLOBAL.COLOR.LIGHT}
          onValueChange={()=>toggleSwitch()}
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
              {updateImage.path ? (
                <TouchableOpacity 
                  style={[styles.btnSubmit, isUpdateEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]}
              
                  onPress={() => updatePost()}
                  disabled={isUpdateEnabled == true ? false : true}
                >
                  <Ionicons name="save-outline"
                    color="white"
                    size={30}
                  />
                  <Text style={styles.btnSubmitText}> Submit Data</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity 
                  style={[styles.btnSubmit, isUpdateEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]}
                  
                  style={[styles.btnSubmit, styles.btnSubmitEnable]}
                    onPress={() => updatePostNoImage()}
                    // disabled={isUpdateEnabled == true ? false : true}
                  >
                    <Ionicons name="save-outline"
                      color="white"
                      size={30}
                    />
                    <Text style={styles.btnSubmitText}> Submit Data</Text>
                  </TouchableOpacity>
                )}
              <Container>

              </Container>


            </View>


          </Form>
        </Content>
      </Container>
    </>
    ):
    (<Login/>)
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
    flexDirection:'row'

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

export default EditBulletin;