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
import GLOBAL from '../Global';
import Login from '../Auth/Login';




const CreateBulletin = () => {

  const { categoryData, storePost, clearPost, loginData, storeBulletin, 
    notifyMessage, submit, setSubmit, image, setImage, mulImages, setMulImages,
     isSubmitEnabled, setIsSubmitEnabled, updateImage, setUpdateImage,
    spinnerModalVisible, multiImgName, setMultiImgName, setSpinnerModalVisible,
    mulImageArray, setMulImageArray } = useContext(PostContext);

  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPickerImage, setIsLoadingPickerImage] = useState(false);
  
  const [isLongPress, setIsLongPress] = useState(false);
  const [selected, setSelected] = useState('');

  const [isStatusEnabled, setIsStatusEnabled] = useState(false);

  const toggleSwitch = () => {

    setSubmit({...submit, status:!submit.status});
    

  };

  const delMulImage = (index) => {

    var array = [...mulImages];
    var pos = array.indexOf(index);
    array.splice(index, 1);
    setMulImages(array);
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
            alert(JSON.stringify(resp.data));
            console.log(JSON.stringify(resp.data));
            alert('success--- '+JSON.stringify(resp.data));
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

  
  const finalMulImageUpload = (cropit) => {

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
        
      // alert(JSON.stringify(imageData));

      setMulImages([...mulImages, imageData]);

      var d = new Date();
      let i = 0;
      
      // for(i = 0; i< images.length; i++)
      // {
      //   var ext = /^.+\.([^.]+)$/.exec(images[0].path);
      //   var fileExt =  ext[1];
      //   let file = multiImgName+'_'+Math.floor(Math.random() * 99)+i+'.'+fileExt;
        
      //   fileArray.push(file);

      //   // if(images.length-1 === i){
      //   //   notifyMessage('uploaded');
      //   // }
      
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
      //     // alert(JSON.stringify(fileArray));
      //     // alert(JSON.stringify(resp.data));
      //     console.log(resp.data);
      //   })
      //   .catch((err) => {
      //      alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
      //   })
      
      // }
      
      console.log(mulImageArray);
 
    })

  }


  // const pickMultipleBase64 = async (cropit) => {

  //   // alert('selected');
  //   setIsLoading(true);
  //   setMulImages({ uri: null, width: null, height:null, mime:null });
  //   let fileArray = [];
  //   ImagePicker.openPicker({
  //     multiple: true,
  //     width: 800,
  //     height: 800,
  //     cropping: cropit,
  //     includeBase64: true,
  //     includeExif: true,
  //   })
  //     .then((images) => {
  //       const imageData = images.map((i) => {
  //         return {
  //           uri: i.path,
  //           width: i.width,
  //           height: i.height,
  //           mime: i.mime,
  //         };
  //       })
  //       setMulImages(imageData);
  //       var i = 0;
  //       function myLoop() {         //  create a loop function
  //         setTimeout(function() {   //  call a 3s setTimeout when the loop is called
  //           uploadImg(images, i);       //  your code here
  //           i++;                    //  increment the counter
  //           if (i < images.length) {           //  if the counter < 10, call the loop function
  //             myLoop();             //  ..  again which will trigger another 
  //           }                 //  ..  setTimeout()
  //         }, 1000)
  //       }
  //       myLoop();  
  //       })
  // }

  async function uploadImg(images, i) {

    if (i === 0) {
      setIsLoading(true);
    }
      var ext = /^.+\.([^.]+)$/.exec(images[i].path);
      var fileExt = ext[1];
      let file = multiImgName + '_' + Math.floor(Math.random() * 99) + i + '.' + fileExt;
      // alert(mulImageArray.length);
      mulImageArray.push(file);
      setMulImageArray(mulImageArray.toString());

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
      ])
      .then((resp) => {
        if (images.length - 1 === i) {
          notifyMessage('uploaded');
          setIsLoading(false);
        }
      }).catch((err) => {
        alert(JSON.stringify('errr00 = ' + JSON.stringify(err)));
      })
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
        setIsLoadingPickerImage(true);
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
              
              notifyMessage('Photo Uploaded...');
              setImage(image);

              setSubmit({...submit, image: file});
              setIsLoadingPickerImage(false);
              
            }).catch((err) => {
              setIsLoadingPickerImage(false);
              
              // alert('failed--- '+JSON.stringify(resp.data));
              notifyMessage('Something went wrong, please Uploaded again.')

              console.log(JSON.stringify(resp.data));
            })

      })
      .catch((e) => notifyMessage('Failed... Please Upload Again.'));
  }


  const delMulImageNew = (index,item) =>{

    var newMulImages = mulImages;
    newMulImages.splice(index, 1);
    setMulImages([...newMulImages]);

    // alert(JSON.stringify(mulImageArray));

    // alert(mulImageArray);
    // var delArray = mulImageArray.split(",");

    // var array = [...mulImageArray]; // make a separate copy of the array
    // var index = array.indexOf(index)
    // if (index !== -1) {
    //   array.splice(index, 1);
    //   setMulImageArray(array);
    // }


    // delArray.splice(index, 1);
    // mulImageArray(delArray);

    // console.log(delArray);
    // alert(delArray);

  //   if(mulImageArray.length == 0){
  //     alert(delArray.length);
  //   }
  //   else{
  //   var delArray = mulImageArray.split(",");
  //  }

    // var array = [...mulImages]; 
    // array.splice(index, 1);

    // var array2 = [...mulImageArray];
    // // mulImageArray.splice(index, 1);
    // array2.splice(index);

    // // mulImageArray.splice(index, 2); 
    // setMulImageArray(mulImageArray);

    
  // var array = [...mulImages]; 
  // array.splice(index, 1);
  // setMulImages(array);
  //   let i =0;
    
  // for(i; i <= array.length ; i++){
    
  //   var ext = /^.+\.([^.]+)$/.exec(array[i].uri);
  //   var fileExt = ext[1];
  //   let file = multiImgName + '_' + Math.floor(Math.random() * 99) + i + '.' + fileExt;

  //   // alert(mulImageArray.length);
  //   // mulImageArray.push(file.toString());

  //   console.log(array[i]);

  // }
  
  

  // var array2 = [...mulImageArray]; 
  // array2.splice(index, 1);
  // setMulImageArray(array2);
  
    

    // alert('arr i '+JSON.stringify(delArray[index]));

    // console.log(JSON.stringify(delArray[index])+ 'all= '+ mulImageArray);
    // console.log('–––––––––––––––––––––––––––––––––––');

    // RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete-unsaved', {
    //   Authorization: "Bearer access-token",
    //   otherHeader: "foo",
    //   'Content-Type': 'multipart/form-data',
    // }, [
    //   { name : 'item', data : delArray[index]},
    // ])
    // .then((resp) => {
      
    //   var array = [...mulImages]; 
    //   array.splice(index, 1);

    //   var array2 = [...mulImageArray];
    //   array2.splice(index, 1);
      
    //   // alert('str - '+JSON.stringify(mulImageArray) + 'arr - '+ JSON.stringify(mulImageArray.toString()));
    //   // alert(JSON.stringify(mulImageArray.toString()));
    //   console.log('Main Array : ' + mulImageArray);
    //   console.log('Deleted Item: ' + JSON.stringify(delArray[index]));
    //   console.log('After Deleted Arr: ' + JSON.stringify(array));

    //   // setMulImageArray(array.toString());
    //   setMulImageArray(JSON.stringify(mulImageArray.toString()));
      
    //   setMulImages(array);

    //   // alert(JSON.stringify(delArray));

    //   notifyMessage(JSON.stringify(resp.data));
    //   // console.log(JSON.stringify(mulImageArray));
    // }).catch((err) => {
    //   alert('eerr--' +JSON.stringify(err));
    // })
  }

  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');

        const newImages = { uri: null, width: null, height: null, mime: null };
        setImage(newImages);
        setMulImages(newImages);

      })
      .catch((e) => {
        alert(e);
      });
  }



  const checkSubmitBtn = () => {

    if ((Array.isArray(updateImage) || updateImage.length === 0 || 
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
    // alert('status- ' + submit.status);
    setIsLoading(false);
    setSpinnerModalVisible(false);
    setIsLoading(false);

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

      {spinnerModalVisible == true ?
        (
          <>
            <SpinnerModal spinnerText="Saving News Bulletin..." />
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
                             
              
          <View style={{ flex: 1, flexDirection: 'row', height: 175, justifyContent: 'center' }}>
            <View style={{ flex: 1, margin: 10, }}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Main Image</Text>

              <Image
                source={updateImage.path ? { uri: updateImage.path } : require('../../assets/no-img-xs.png')}
                style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
              />

            </View>
            <View style={{
              flex: 2,
              alignItems: 'center', marginTop: 10, justifyContent: 'center'
            }}>

              <TouchableOpacity
                onPress={() => pickSingleBase64(false)}
                style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
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

                <View style={{flexDirection:'row', flex:1}}>
                <TouchableOpacity
                onPress={() => finalMulImageUpload()}
                style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
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
                    <Text style={styles.imageBtnText}>More Images</Text>
                  </>
                  )}
              </TouchableOpacity>

              </View>


            </View>
            </View>
            <Form style={styles.formContainer}>


            {mulImages.uri !== null ? (
              //   <View style={{flex:1, flexDirection:'column', justifyContent: 'center', height:200}}>
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                  data={mulImages}
                  keyExtractor={(index) => index}
                    
                  renderItem={({ item, index }) =>
                    <View style={styles.GridViewContainer} 
                    
                    >
                      {/* <ImageList 
                    data={item} 
                    index={index}
                    numColumns={4}
                    keyExtractor={(item, index) => index}
                /> */}

                      {
                        mulImages.uri !== null ?
                          (
                            <>
                              <View style={{ borderRadius: 40, padding: 4 }} key={index+'-'+item}>
                                <ImageBackground
                                  style={[styles.imageThumbnail, { width: width / 4.4, borderWidth: 1, borderColor: 'silver' }]}
                                  source={{ uri: item.uri }}
                                  imageStyle={{ borderRadius: 6 }}
                                  key={index+'-'+item}
                                >
                                  <Ionicons
                                    style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: '#ffffffc7', borderRadius: 4 }}
                                    name="trash-sharp"
                                    color={GLOBAL.COLOR.DARK}
                                    size={24}
                                    key={index}
                                    onPress={() => delMulImageNew(index,item)}
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

            ) : <Text>Multiple Images</Text>}

            <View style={styles.item}>
              
            <Label style={styles.labelStyle}>img list {JSON.stringify(mulImages)}</Label>

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
                  editable={true}
                  name="title"
                  
                  onChangeText={(e)=>changeTitle(e)}
                  defaultValue={submit.title}
                  style={styles.textArea} rowSpan={5} bordered placeholder="Titlte of bulletin" />
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
                  style={styles.textArea} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
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
                  style={[styles.textArea, { height: 150 }]} rowSpan={5} bordered placeholder="Buletin Body Details..." />
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

            <View style={styles.item}>
              <TouchableOpacity style={[styles.btnSubmit, isSubmitEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]}
                onPress={() => storeBulletin()}
                disabled={isSubmitEnabled == true ? false : true}
              >

                <Ionicons name="save-outline"
                  color="white"
                  size={30}
                />
                <Text style={styles.btnSubmitText}> Submit Data</Text>
              </TouchableOpacity>
              

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