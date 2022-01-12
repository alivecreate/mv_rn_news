import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
  View, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, FlatList, SafeAreaView,
  ScrollView, TouchableOpacity, useWindowDimensions, Linking, ActivityIndicator,
  TouchableRipple, Switch
} from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import {Picker} from '@react-native-picker/picker';


import { Container, Content, Textarea, Form,  Input, Button, Label } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';


// import {TextInput} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { Header } from 'react-native-elements';
import {LeftMenu, ScreenTitle, HeaderBar } from '../Header/HeaderBar'

import { useNavigation } from '@react-navigation/native';
import SpinnerModal from '../Widget/SpinnerModal';
import ImageUploadModal from '../Widget/ImageUploadModal';

import GLOBAL from '../Global';
import Login from '../Auth/Login';




const CreateBulletin = () => {

  const { categoryData, storePost, clearPost, loginData, storeBulletin,
     btnMoreImage, setBtnMoreImage,
    notifyMessage, submit, setSubmit, image, setImage, mulImages, setMulImages,
     isSubmitEnabled, setIsSubmitEnabled, updateImage, setUpdateImage, clearData,
    spinnerModalVisible, multiImgName, setMultiImgName, setSpinnerModalVisible,
    mulImageArray, setMulImageArray } = useContext(PostContext);

  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPickerImage, setIsLoadingPickerImage] = useState(false);
  
  const [isLongPress, setIsLongPress] = useState(false);
  const [selected, setSelected] = useState('');

  const [fileNames, setFileNames] = useState([]);
  const [imageData, setImageData] = useState([]);
  
  const [isStatusEnabled, setIsStatusEnabled] = useState(false);

  const toggleSwitch = () => {

    setSubmit({...submit, status:!submit.status});
    

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

            setSubmit({...submit, image: file});
            setIsLoadingPickerImage(false);
            
          }).catch((err) => {
            setIsLoadingPickerImage(false);
            
            alert('Network Error, Please Try Again.'+JSON.stringify(resp.data));
            console.log(JSON.stringify(resp.data));
          })
    })
    .catch((e) => notifyMessage('Failed... Please Upload Again.'));
  }
  
  const pickSingleBase64 = (cropit) => {
    
    setIsLoadingPickerImage(true);
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
      mediaType: 'photo'
    })

      .then((image) => {
        const newupdateImage = { uri: `data:${updateImage.mime};base64,` + updateImage.data, width: updateImage.width, height: updateImage.height };
        setImage(image);
        setIsLoadingPickerImage(false);


      })
      .catch((e) => alert(e));
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
        var fileExt =  ext[1];
        var file = multiImgName+'_'+Math.floor(Math.random() * 99)+'.'+fileExt;

          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            fileName: file,
            fileData: i.data
          };
        })
        
        alert('ddf file 00 '+JSON.stringify(imageData[0].uri));
        console.log('ddf file 00 '+JSON.stringify(imageData));
        
      var i = 0;
      for(i ; i < imageData.length; i++){
        console.log(imageData[i].fileName);

        var newMulImages = mulImages;
        newMulImages.push(imageData[i]);
        
        // console.log(mulImageArray);

        var ext = /^.+\.([^.]+)$/.exec(newMulImages[0].uri);
        var fileExt =  ext[1];

        // RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
        //   Authorization : "Bearer access-token",
        //   otherHeader : "foo",
        //   'Content-Type' : 'multipart/form-data'
        //   }, 
        //   [{ 
        //       name : 'avatar', 
        //       filename : imageData[i].fileName, 
        //       type:'avatar/'+fileExt,
        //       data: images[i].data,
        //     },
        //   ])
        //   .then((resp) => {
        //     setMulImageArray(fileArray.toString());
        //   })
        //   .catch((err) => {
        //      alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
        //   })
        
        var newFileNames = fileNames;
        newFileNames.push(imageData[i]); 

        // var newImageData = imageData;
        // newImageData.push(imageData[i].fileData); 
  
        // var newMulImageArray = mulImageArray;
        // newMulImageArray.join(imageData[i].fileName);
      }
      
      // setImageData([...newImageData]);

      // console.log(mulImageArray);

      setMulImages([...newMulImages]);
      setFileNames([...newFileNames]);
      // setMulImageArray([...newMulImageArray]);
      
      // console.log('arr- '+mulImageArray);

      console.log('f name- '+JSON.stringify(fileNames));


      var d = new Date();
      // for(i = 0; i< images.length; i++)
      // {
      //   var ext = /^.+\.([^.]+)$/.exec(images[0].path);
      //   var fileExt =  ext[1];
      //   let file = multiImgName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
        
      //   fileArray.push(file);

      //   RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
      //   Authorization : "Bearer access-token",
      //   otherHeader : "foo",
      //   'Content-Type' : 'multipart/form-data'
      //   }, 
      //   [{ 
      //       name : 'avatar', 
      //       filename : file, 
      //       type:'avatar/'+fileExt,
      //       data: images[i].data,
      //     },
      //   ])
      //   .then((resp) => {
      //     setMulImageArray(fileArray.toString());
      //   })
      //   .catch((err) => {
      //      alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
      //   })
      
      // }
 
      console.log('db names 11 ='+fileNames);
    })
  }

  const uploadStart = () =>{
      // alert(JSON.stringify(fileNames));
      console.log(JSON.stringify(fileNames));

      var i = 0;
      for(i ; i < fileNames.length; i++){

        var ext = /^.+\.([^.]+)$/.exec(fileNames[0].uri);
        var fileExt =  ext[1];
        let file = multiImgName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
        
        // alert(JSON.stringify(fileNames[0].uri));

        RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/test-multiple', {
          Authorization : "Bearer access-token",
          otherHeader : "foo",
          'Content-Type' : 'multipart/form-data'
          }, 
          [{ 
              name : 'avatar', 
              filename : fileNames[i].fileName, 
              type:'avatar/'+fileExt,
              data: fileNames[i].fileData,
            },
          ])
          .then((resp) => {
            alert(JSON.stringify(resp.data));
            // setMulImageArray(fileArray.toString());
          })
          .catch((err) => {
             alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
          })
      }
  }

  const delMulImageNew = (index,item) =>{
    
    var newMulImages = mulImages;
    newMulImages.splice(index, 1);
    setMulImages([...newMulImages]);

    var newFileNames = fileNames;
    newFileNames.splice(index, 1);
    setFileNames([...newFileNames]); 

    // console.log('delted'+JSON.stringify(fileNames));

    // alert(mulImages.split(","));

    var delArray = fileNames.toString().split(",");
    console.log('db strinbg 0- '+ delArray);

    // var newMulImages = mulImages;
    // newMulImages.splice(index, 1);
    // setMulImages([...newMulImages]);

    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete-unsaved', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name : 'item', data : delArray[index]},
    ])
    .then((resp) => {
      
      // var array = [...mulImages]; 
      // array.splice(index, 1);
      // var array2 = [...mulImageArray];
      // array2.splice(index, 1);
      
      // console.log('Main Array : ' + mulImageArray);
      // console.log('Deleted Item: ' + JSON.stringify(delArray[index]));
      // console.log('After Deleted Arr: ' + JSON.stringify(array));

      // setMulImageArray(JSON.stringify(mulImageArray.toString()));
      // setMulImages(array);

      // notifyMessage(JSON.stringify(resp.data));

      alert('del --' + resp.data);


    }).catch((err) => {
      alert('eerr--' +JSON.stringify(err));
    })

  }


  const checkSubmitBtn = () => {

    if ((Array.isArray(image) || image.length === 0 || 
    submit.category === '' || submit.category === null|| 
    submit.title === '' || submit.subtitle === ''
      || submit.body === '' || submit.slug === '')) {
      // alert(image.length);
      alert('All Field are Required');
      setIsSubmitEnabled(false);

    } else {
      setIsSubmitEnabled(true);
    }
  }

  const changeCategory = (e) => {
    setSubmit({...submit, category: e});
  }
  const changeTitle = (e) => {
    setSubmit({...submit, title: e});
  }
  const changeSubHeading = (e) => {
    setSubmit({...submit, subtitle: e});
  }
  
  const changeYoutube = (e) => {    
    setSubmit({...submit, youtube: e});
  }
  
  const changeBody = (e) => {
    var eText = '<p>' + e + '</p>';
    setSubmit({...submit, body: e});
  }
  const changeSlug = (e) => {
    setSubmit({...submit, slug: e});
  }
 

  const isSubmitEnabledFn = () => {
    // setIsSubmitEnabled(!isSubmitEnabled);
    // alert(submit.title);
    // if(submit.title == null && submit.category == null){
    //   alert('null - title - ' + submit.title +'category-'+ submit.category );
    //   setIsSubmitEnabled(false);
    // }else{
    //   alert('not null - title - ' + submit.title +'category-'+ submit.category );

    //   setIsSubmitEnabled(true);

    // }
  }

  useEffect(() => {
    // alert('user data - ' + JSON.stringify(loginData.loginUserData.email));

    setFileNames([]);
    setIsLoading(false);
    // setSpinnerModalVisible(true);
    setIsLoading(false);
    setBtnMoreImage(false);
    setUpdateImage([]);
    clearPost();



    // alert(JSON.stringify(categoryData));

    // setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });

    // alert(submit.title);
    // alert(JSON.stringify(categoryData));
    // return(()=>{
    //   alert('test');
    // setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });
    // setSubmit({ uri: '', width: '', height:'', mime:'' });
    // setSubmit({ uri: null, width: null, height:null, mime:null });
    // })

    var d = new Date();
    var timefileName = d.getTime();
    setMultiImgName(timefileName);
    clearPost();
    
    // alert(JSON.stringify(loginData.loginUserData.id));
    
    // return () => { alert('finished') };
  }, [])


// const longPress = () =>{
//   alert('lognsasa');
//   setIsLongPress(true);
// }

  return (
    loginData.loginStatus === 'login'?(
    <>

      {spinnerModalVisible ?
        (
          <>
            <ImageUploadModal spinnerText="Upload Multiple Image" />
          </>
        ) : null}

        
      <Container style={styles.container}>
          
        {/* <HeaderBar title="Create Bulletin" headerType="createBulletin" icon="document-text-outline" /> */}
        
        
        <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<LeftMenu />}
                centerComponent={<ScreenTitle icon='document-text-outline' title='Create Bulletin' />}
                // rightComponent={{ type :'ionicon', icon: 'ios-ellipsis-vertical-sharp', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />

        <Content>
                             
          <View style={{ flex: 1, flexDirection: 'row', height: 140, justifyContent: 'center' }}>
            <View style={{ flex: 1, margin: 10, }}>

              <Image
                source={image.path ? { uri: image.path } : require('../../assets/no-img-xs.png')}
                style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
              />

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
                {
                  btnMoreImage == true?(
              <TouchableOpacity
                onPress={() => setSpinnerModalVisible(!spinnerModalVisible)}
                style={[styles.imgButton,{backgroundColor:'whitesmoke'}]}
              >
                
                <Ionicons name="md-camera-outline"
                  color="black"
                  size={32}
                />

                <Text style={styles.imageBtnText}>More Images</Text>
              </TouchableOpacity>
              ):null}

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

            <View style={styles.item}>
              

              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Category</Label>
              
              
              <View style={styles.textAreaContainer}>

              <Picker
                            
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={submit.category}
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
                  multiline={true}
                  editable={true}
                  name="title"
                  
                  onChangeText={(e)=>changeTitle(e)}
                  defaultValue={submit.title}
                  style={[styles.textArea, { height: 120 }]} rowSpan={5} bordered placeholder="Titlte of bulletin" />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Sub Heading</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  editable= {true}
                  defaultValue={submit.subtitle}
                  onChangeText={(e) => changeSubHeading(e)}
                  style={[styles.textArea, { height: 120 }]} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}></Text>Youtube Video</Label>
              <View style={styles.textAreaContainer}>
                <TextInput
                editable= {true}
                  defaultValue={submit.youtube}
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
                  defaultValue={submit.body}
                  style={[styles.textArea, { height: 260 }]} rowSpan={5} bordered placeholder="Buletin Body Details..." />
              </View>
            </View>

            <View style={styles.item}>
              <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Slug</Label>
              <View style={styles.textAreaContainer}>
                <Input
                editable= {true}
                
                  onChangeText={(e) => changeSlug(e)}
                  defaultValue={submit.slug}
                  style={[styles.textArea, { }]} rowSpan={5} bordered placeholder="Url Slug" />


              </View>
            </View>

            <View style={[styles.item,{alignContent:'center', justifyContent:'space-around'}]}>
                <Label style={styles.labelStyle}><Text style={[styles.spanText,{marginRight:50}]}>* </Text>Status</Label>
                
                    
                <Switch
                  trackColor={{ false: "silver", true: 'silver' }}
                  thumbColor={submit.status ? GLOBAL.COLOR.DARK : GLOBAL.COLOR.DARK}
                  ios_backgroundColor= {GLOBAL.COLOR.LIGHT}
                  onValueChange={()=>toggleSwitch()}
                  value={submit.status}
                />
            </View> 


            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              

          <CheckBox
              disabled={false}
              value={isSubmitEnabled}
              onValueChange={() => checkSubmitBtn()}
            />


              <Text style={{ marginTop: 5, fontSize: 18 }}> All fields are required...</Text>
            </View>

            <View style={[{flexDirection:'row'}]}>
              
            <TouchableOpacity style={[styles.btnSubmit, isSubmitEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]
                  }
                onPress={() => {storeBulletin(), setSpinnerModalVisible(true)}}
                disabled={isSubmitEnabled == true ? false : true}
              >

                <Text style={[styles.btnSubmitText,{flex:1}]}>
                <Ionicons name="save-outline"
                  color="white"
                  size={20}
                  style={{flex:1}}

                /> Submit Data</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.btnSubmit,  {backgroundColor:'black'}]}
                onPress={() => clearData('bulletin_form_clear')}
              >

                <Text style={[styles.btnSubmitText,{flex:1}]}>
                <Ionicons name="save-outline"
                  color="white"
                  size={20}
                /> Reset Form</Text>
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
item:{
  flex:1,
  width:'100%',
  alignItems:'center',

},

btnSubmit: {
  height: 40,
  alignItems: 'center',
  alignContent:'space-around',
  flex:1,
  flexDirection:'row',
  textAlign:'center',
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
    textTransform: 'uppercase',
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
    width: '100%',
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

export default CreateBulletin;