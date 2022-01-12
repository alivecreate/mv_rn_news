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
import SpinnerModal from '../Widget/SpinnerModal';
import { useNavigation } from '@react-navigation/native';
import GLOBAL from '../Global';
import ImageUploadModal from '../Widget/ImageUploadModal';

import DeletingText from '../Widget/DeletingText';
import Spinner from '../Widget/Spinner';
import Login from '../Auth/Login';


  
const EditPost = ({ props, route }) => {
  const { id, category_id, title, subtitle, youtube, body,
           slug, image, mul_images, status } = route.params.item;
  

    const [updatePost, setUpdatePost] = useState({ id:null, category: null, title: null, subtitle: null,youtube:null, slug: null, body: null,
    image:[], mul_images:[], status:true, admin_id: null });

    
const editNews = (id) => {
  // alert(JSON.stringify(id));
  var newId = parseInt(id);
  // alert('edit id -'+typeof newId);

  axios.post(GLOBAL.BASE_URL+'api/post/edit-post/'+newId)
  .then(res => {
      setUpdatePost({
      id: res.data.post.id, category: res.data.post.category_id, title: res.data.post.title,
      subtitle: res.data.post.subtitle, slug: res.data.post.slug, body: res.data.post.body,
      youtube:res.data.post.youtube,
      image: res.data.post.media, status: res.data.post.status==1?true:false, admin_id: 1
    });
    // setMulImages(res.data.media);
    setSpinnerModalVisible(false);
    
  })
  .catch(error => {
    setSpinnerModalVisible(false);
      alert('Server Error - '+JSON.stringify(error.response));
  })

}

    


  

  const [isLoading, setIsLoading] = useState(false);
  const [btnMoreImage, setBtnMoreImage] = useState(false);

  const { categoryData, notifyMessage, updateImage, setUpdateImage, updatePostFn, savingData, setSavingData,
    loginData, update, setUpdate, isUpdateEnabled, setIsUpdateEnabled, multiImgName,
     mulImageArray, setMulImageArray, mulArray, setMulArray } = useContext(PostContext);


  const navigation = useNavigation();

  const [selected, setSelected] = useState('');
  const [updatedImg, setUpdatedImg] = useState('');
  const [mulImages, setMulImages] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoadingPickerImage, setIsLoadingPickerImage] = useState(false);
  const [isUpdateStatusEnabled, setIsUpdateStatusEnabled] = useState(status == 1?true:false);
const [spinnerModalVisible, setSpinnerModalVisible] = useState(false);
  
const toggleSwitch = () => {
    setUpdatePost({...updatePost, status:!updatePost.status})
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


  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      includeBase64: true,
    })
    
    .then((image) => {
      setIsLoadingPickerImage(true);
        var d = new Date();
        let i = 0;
        var ext = /^.+\.([^.]+)$/.exec(image.path);
        var fileExt =  ext[1];
        
        var timefileName = d.getTime();
        let file = timefileName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
        
        setUpdateImage(image);

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
            notifyMessage('Image Uploaded');
            setImage(image);

            setUpdatePost({...updatePost, image: file});
            setIsLoadingPickerImage(false);
            
          }).catch((err) => {
            setIsLoadingPickerImage(false);
            
            alert('Network Error, Please Try Again.'+JSON.stringify(resp.data));
           
          })
    })
    .catch((e) => notifyMessage('Failed... Please Upload Again.'));
  }
  
  const changeCategory = (e) => {

    setUpdatePost({
      id: updatePost.id, category: e, title: updatePost.title, subtitle: updatePost.subtitle, youtube: updatePost.youtube, slug: updatePost.slug, body: updatePost.body,
      image: updatePost.image, status: updatePost.status
    });
    // alert(updatePost.category);
    // checkUpdateBtn();
  }
  const changeTitle = (e) => {
    setUpdatePost({ id: updatePost.id, category: updatePost.category, title: e, subtitle: updatePost.subtitle, youtube: updatePost.youtube, slug: updatePost.slug, body: updatePost.body, image: updatePost.image, status: updatePost.status });
    // checkUpdateBtn();
  }
  const changeSubHeading = (e) => {
    setUpdatePost({ id: updatePost.id, category: updatePost.category, title: updatePost.title, subtitle: e, youtube: updatePost.youtube,
       slug: updatePost.slug, body: updatePost.body,
       image: updatePost.image, status: updatePost.status });
    // checkUpdateBtn();
  }
  
  
  const changeYoutube = (e) => {
    setUpdatePost({ id: updatePost.id,
      category: updatePost.category, title: updatePost.title, subtitle: updatePost.subtitle, youtube: e, slug: updatePost.slug,
       body: updatePost.body, image: updatePost.image, status: updatePost.status
    });

    // checkUpdateBtn();
  }


  const changeBody = (e) => {
    
    setUpdatePost({ id: updatePost.id, category: updatePost.category, title: updatePost.title, subtitle: updatePost.subtitle, youtube: updatePost.youtube, slug: updatePost.slug,
       body: e, image: updatePost.image, status: updatePost.status });
    // checkUpdateBtn();

  }
  const changeSlug = (e) => {
    setUpdatePost({ id: updatePost.id, category: updatePost.category, title: updatePost.title, subtitle: updatePost.subtitle, youtube: updatePost.youtube, slug: e, body: updatePost.body, image: updatePost.image, status: updatePost.status });
    // checkUpdateBtn();

  }
  const changeStatus = (e) => {
    setUpdatePost({ id: updatePost.id, category: updatePost.category, title: updatePost.title, subtitle: updatePost.subtitle, youtube: updatePost.youtube, slug: e, body: updatePost.body, image: updatePost.image, status: updatePost.status });
    // checkUpdateBtn();

  }
  
  const delMulImageNew = async (index, id, post_id, image) =>{
    setIsDeleting(true);

    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete-unsaved', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name : 'id', data : id.toString()},
      { name : 'post_id', data : post_id.toString()},
      { name : 'item', data : image},
    ])
    .then((resp) => {

      let newArr = resp.json();
      setMulImages([...newArr.media]);

      notifyMessage('Image Deleted');
      setIsLoading(false);

      // if(resp.data == 'success'){
      //   var newMulImages = mulImages;
      //   newMulImages.splice(index, 1);
      //   setMulImages([...newMulImages]);
      //   newFileNames.splice(index, 1);

        // var newFileNames = resp.data.media;

        // setMulImages(resp.data.media); 

        // notifyMessage(JSON.stringify(resp.data.media));

        // notifyMessage(resp.data.media);


      // }else{
      //     notifyMessage('del -- 11 ' + resp.data);
      // }

    }).catch((err) => {
      alert('eerr--' +JSON.stringify(err));
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

const uploadMoreImage = async () => {
  // alert(typeof route.params.item.id);
  
  ImagePicker.openPicker({
      width: 800,
      height: 800,
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

               RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/upload-more-image', {
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
                  { name : 'post_id', data : route.params.item.id.toString()},
        
                ])

                .then((resp) => {
                    


                      let newArr = resp.json();
                      setMulImages([...newArr.media]);

                      notifyMessage('Image Uploaded');
                      setIsLoading(false);
                  

                })
                .catch((err) => {
                    
                  // alert(err);
                  notifyMessage(err+ ' Something went wrong, Please try again. ')
                })


      })
      
      .catch((e) => alert(e));
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



  // const editPost = async (id) => {
  //   try {
  //     const response = await fetch( GLOBAL.BASE_URL+'post/edit-post/'+id);
  //     var json = await response.json();
  //     console.log('edit data - ' + JSON.stringify(json));
  //     return json.post;
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  useEffect(() => {
    // alert(id);
    // setUpdatePost([]);
    // alert(JSON.stringify(route.params.item));
    setUpdateImage([]);
    setSpinnerModalVisible(true);

    setTimeout(() => {
      editNews(route.params.item.id);
    }, 500);

    // setSpinnerModalVisible(true);

    // setUpdateImage([]);
    // setIsUpdateEnabled(true);
    // setBtnMoreImage(false);

  }, [route.params.item.id]);


  return (
    loginData.loginStatus === 'login'?(
    <>

{spinnerModalVisible == true ?
        (
          <>
            {/* <ImageUploadModal spinnerText="Upload Multiple Image" /> */}
            <SpinnerModal spinnerText="Loading Data..." />

          </>
        ) : null}

{savingData == true ?
        (
          <>
            {/* <ImageUploadModal spinnerText="Upload Multiple Image" /> */}
            <SpinnerModal spinnerText="Saving Data..." />

          </>
        ) : null}

      <Container style={styles.container}>

        <HeaderBar title="Edit News" id={id} postType='editNews'
        headerType="editNews" icon="document-text-outline" />
        

        <Content>
          <View style={{ flex: 1, flexDirection: 'row', height: 140, justifyContent: 'center' }}>
            <View style={{ flex: 1, margin: 10, }}>

            {updateImage ? (
              <Image
                source={updateImage.path ?{uri: updateImage.path} : { uri: GLOBAL.BASE_URL+'web/media/xs/'+image } }
                style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
              />
            ):(
              <Image
                source={image ? { uri: GLOBAL.BASE_URL+'web/media/xs/'+image } : require('../../assets/no-img-xs.png')}
                style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
              />
            )}
            
            </View>

            <View style={{
              flex: 2,
              alignItems: 'center', marginTop: 10, justifyContent: 'center'
            }}>

              <TouchableOpacity
                onPress={() => pickSingleBase64(false)}
                style={[styles.imgButton, {backgroundColor: 'whitesmoke', }]}
              >

                {isLoadingPickerImage == true ?
                  (<>
                    <ActivityIndicator size={40} color='black' />
                    <Text style={styles.imageBtnText}>Uploading...</Text>
                  </>
                  ) : (<>

                <Ionicons name="ios-images-outline"
                  color="black"
                  size={32}
                />
                <Text style={styles.imageBtnText}>Open Images</Text>
                </>)
                }
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
{/* 
              <TouchableOpacity
                onPress={() => uploadMoreImage()}
                style={[styles.imgButton,{backgroundColor:'whitesmoke'}]}
              >
                <Ionicons name="md-camera-outline"
                  color="black"
                  size={32}
                />

                <Text style={styles.imageBtnText}>More Images</Text>
              </TouchableOpacity>
               */}

            </View>
            </View>

            <Form style={styles.formContainer}>
              
{/*               
            <TouchableOpacity
                onPress={() => uploadStart(false)}
                style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
              >
                <Text>Upload Start</Text>
            </TouchableOpacity> */}
{/* 
{mulImages !== null ? (
              <SafeAreaView style={{ flex: 1 }}>
                  <FlatList
                      data={mulImages}
                      renderItem={({ item, index }) =>
                          <View style={styles.GridViewContainer}>
                              {
                            mulImages !== null ?
                                (
                                  <>
                                  <View style={{ borderRadius: 40, padding: 4 }}>
                                      <ImageBackground
                                          style={[styles.imageThumbnail, { width: width / 4.9, borderWidth: 1, borderColor: 'silver' }]}
                                          source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item.image }}
                                          imageStyle={{ borderRadius: 6 }}
                                          key={index}
                                      >
                                      <Ionicons
                                          style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'white', borderRadius: 4 }}
                                          name="trash-sharp"
                                          color={GLOBAL.COLOR.DARK}
                                          size={24}
                                          key={index}
                                          onPress={() => delMulImageNew(index, item.id, item.post_id, item.image)}
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
          } */}

            <View style={styles.item}>
              
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Category</Label>
              
              <View style={styles.textAreaContainer}>

              <Picker
                            
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={updatePost.category}
              onValueChange={(e) => changeCategory(e)}
              >
                        <Picker.Item label="Select Category" key={0} value={null} />
                    {
                    categoryData.map((category) => {
                      return (
                        <Picker.Item label={category.name} key={category.id} value={category.id} />
                      )}
                    )
                    }
              </Picker>

              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Title</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                  editable={true}
                  multiline={true}
                  name="title"
                  
                  onChangeText={(e)=>changeTitle(e)}
                  defaultValue={updatePost.title}
                  style={[styles.textArea, { height: 120 }]} rowSpan={5} bordered placeholder="Titlte of bulletin" />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Sub Heading</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  editable= {true}
                  defaultValue={updatePost.subtitle}
                  onChangeText={(e) => changeSubHeading(e)}
                  style={[styles.textArea, { height: 120 }]} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}></Text>Youtube Video</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                editable= {true}
                  defaultValue={updatePost.youtube}
                  onChangeText={(e) => changeYoutube(e)}
                  style={styles.textArea} rowSpan={5} bordered placeholder="Youtube Link" />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Body</Label>
              <View style={styles.textAreaContainer}>
                <Input
                  multiline={true}
                  onChangeText={(e) => changeBody(e)}
                  defaultValue={updatePost.body}
                  style={[styles.textArea, { height: 260 }]} 
                  rowSpan={7} bordered placeholder="Buletin Body Details..." />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Slug</Label>
              <View style={styles.textAreaContainer}>
                <Input
                editable= {true}
                  onChangeText={(e) => changeSlug(e)}
                  defaultValue={updatePost.slug}
                  style={[styles.textArea, { }]} rowSpan={5} bordered placeholder="Url Slug" />


              </View>
            </View>

            <View style={[styles.item,{alignContent:'center', justifyContent:'space-around'}]}>
                <Label style={styles.labelStyle}><Text style={[styles.spanText,{marginRight:50}]}>* </Text>Status</Label>
                
                    
                <Switch
                  trackColor={{ false: "silver", true: 'silver' }}
                  thumbColor={updatePost.status ? GLOBAL.COLOR.DARK : GLOBAL.COLOR.DARK}
                  ios_backgroundColor= {GLOBAL.COLOR.LIGHT}
                  onValueChange={()=>toggleSwitch()}
                  value={updatePost.status}
                />
            </View> 


            {/* <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <CheckBox
                  disabled={false}
                  value={isUpdateStatusEnabled}
                  onValueChange={() => checkUpdateBtn()}
                />


              <Text style={{ marginTop: 5, fontSize: 18 }}> All fields are required...</Text>
            </View> */}

            <View>
              
            <TouchableOpacity 
              style={[styles.btnSubmit, isUpdateEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]
                  }
                onPress={() => updatePostFn('bulletin', updatePost)}
                disabled={isUpdateEnabled == true ? false : true}
              >

                <Text style={[styles.btnSubmitText,{flex:1}]}>
                <Ionicons name="save-outline"
                  color="white"
                  size={19}
                  style={{flex:1}}

                />  Update Bulletin</Text>
              </TouchableOpacity>
              

              </View>
              <Container>

              </Container>




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
    textAlign:'center'
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
    height: 60,
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

export default EditPost;