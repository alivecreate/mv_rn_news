import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
  View, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, FlatList, SafeAreaView,
  ScrollView, TouchableOpacity, useWindowDimensions, Linking, ActivityIndicator,
  TouchableRipple, Switch
} from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker';

import { Container,  Content, NativeBaseProvider, Textarea, Form, Item, Input, Button, Label }
 from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Header } from 'react-native-elements';
import {LeftMenu, ScreenTitle } from '../Header/HeaderBar'

import { useNavigation } from '@react-navigation/native';
import SpinnerModal from '../Widget/SpinnerModal';

import GLOBAL from '../Global';
import Login from '../Auth/Login';



export default function CreatePressnote() {
  

  const {storePressnote, categoryData, clearPost, loginData, pressnoteListData, totalPressnote,
    notifyMessage, submit, setSubmit,  setImage, mulImages, setMulImages, isSubmitEnabled, setIsSubmitEnabled,
    spinnerModalVisible, multiImgName, setMultiImgName,
    mulImageArray, setMulImageArray } = useContext(PostContext);

  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isLongPress, setIsLongPress] = useState(false);

  const [selected, setSelected] = useState('');


  const [isStatusEnabled, setIsStatusEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsStatusEnabled(!isStatusEnabled);
  };

  const delMulImage = (index) => {

    var array = [...mulImages];
    var pos = array.indexOf(index);
    array.splice(index, 1);
    setMulImages(array);


  }

  const pickMultipleBase64 = async (cropit) => {

    // alert('selected');
    setIsLoading(true);
    setMulImages({ uri: null, width: null, height:null, mime:null });
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

        var i = 0;
        function myLoop() {         //  create a loop function
          setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            uploadImg(images, i);       //  your code here
            i++;                    //  increment the counter
            if (i < images.length) {           //  if the counter < 10, call the loop function
              myLoop();             //  ..  again which will trigger another 
            }                 //  ..  setTimeout()
          }, 1000)
        }
        myLoop();  
        })
  }

  async function uploadImg(images, i) {
    if (i === 0) {
      setIsLoading(true);
    }

    var ext = /^.+\.([^.]+)$/.exec(images[i].path);
    var fileExt = ext[1];
    let file = multiImgName + '_' + Math.floor(Math.random() * 99) + i + '.' + fileExt;
    

    // setMulImageArray(mulImageArray.toString());
    
    

    // alert('rrr-  '+mulImageArray);

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
      
      mulImageArray.push(file);
      if (images.length - 1 === i) {
        notifyMessage('uploaded');
        
      setMulImages(mulImageArray);
        setIsLoading(false);
      }
      
      

    }).catch((err) => {
      alert(JSON.stringify('errr00 = ' + JSON.stringify(err)));
    })
  }

  const delMulImageNew = (index, item) => {
    var delArray = mulImageArray.split(",");
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'api/post/mob-media-delete-unsaved', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'item', data: delArray[index] },
    ])
      .then((resp) => {

        var array = [...mulImages];
        array.splice(index, 1);

        setMulImageArray(mulImageArray.toString());
        setMulImages(array);

        notifyMessage(JSON.stringify(resp.data));
        console.log(JSON.stringify(resp));
      }).catch((err) => {
        alert(JSON.stringify(err));
      })
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
    if ( submit.category === '' || submit.category === null ||
      submit.title === '' || submit.subtitle === '') {

      // alert(image.length);
      alert('All Field are Required');
      setIsSubmitEnabled(false);

    } else {
      // alert('not null');
      setIsSubmitEnabled(true);
    }
  }

  const changeCategory = (e) => {

    setSubmit({
      category: e, title: submit.title, subtitle: submit.subtitle, youtube: submit.youtube, slug: submit.slug, body: submit.body,
      image: submit.image, mul_images: submit.mul_images, status: submit.status
    });
    // alert(submit.category);
    // checkSubmitBtn();
  }
  const changeTitle = (e) => {
    setSubmit({
      category: submit.category, title: e, subtitle: submit.subtitle, youtube: submit.youtube, slug: submit.slug, body: submit.body, image: submit.image,
      mul_images: submit.mul_images, status: submit.status
    });
    // checkSubmitBtn();

  }
  const changeSubHeading = (e) => {
    setSubmit({
      category: submit.category, title: submit.title, subtitle: e, youtube: submit.youtube, slug: submit.slug, body: submit.body, image: submit.image,
      mul_images: submit.mul_images, status: submit.status
    });
    // checkSubmitBtn();
  }

  const changeStatus = (e) => {
    setSubmit({
      category: submit.category, title: submit.title, subtitle: submit.subtitle, youtube: submit.youtube, slug: e, body: submit.body, image: submit.image,
      mul_images: submit.mul_images, status: submit.status
    });

  }

  useEffect(() => {

    setIsLoading(false);
    setIsLoading(false);

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



    // return () => { alert('finished') };
  }, [])
  
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

          {/* <HeaderBar title="Create Pressnote" headerType="createBulletin" icon="document-text-outline" /> */}
          

          <Header
                statusBarProps={{ backgroundColor: GLOBAL.COLOR.DARK, barStyle: 'light-content' }}
                leftComponent={<LeftMenu />}
                centerComponent={<ScreenTitle icon='document-text-outline' title='Create Pressnote' />}
                // rightComponent={{ type :'ionicon', icon: 'ios-ellipsis-vertical-sharp', color: 'white' ,size:25}}
                containerStyle={styles.headerBar}
            />

        <Content>

            <Form style={styles.formContainer}>



              <View style={styles.item}>
                <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Category</Label>
                <View style={styles.textAreaContainer}>

                <Picker
                  mode="dropdown"
                  selectedValue='0'
                  style={{height: 50, width: '100%'}}
                  selectedValue={submit.category}
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
                  <TextInput
                    editable={true}
                    name="title"

                    onChangeText={(e) => changeTitle(e)}
                    defaultValue={submit.title}
                    style={styles.textArea} rowSpan={5} bordered placeholder="Titlte of bulletin" />
                </View>
              </View>

              <View style={styles.item}>
                <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Sub Heading</Label>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    multiline={true}
                    editable={true}
                    defaultValue={submit.subtitle}
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
                            ) : <Text>Mul Images</Text>}


                {/* 
                {mulImages.uri !== null ? (
                //   <View style={{flex:1, flexDirection:'column', justifyContent: 'center', height:200}}>
                <SafeAreaView style={{ flex: 1 }}>
                  <FlatList
                    data={mulImages}
                    keyExtractor={(index) => index}

                    renderItem={({ item, index }) =>
                      <View style={styles.GridViewContainer}

                      >
                        {
                          mulImages.uri !== null ?
                            (
                              <>
                                <View style={{ borderRadius: 40, padding: 4 }} key={index}>
                                  <ImageBackground
                                    style={[styles.imageThumbnail, { width: width / 4.4, borderWidth: 1, borderColor: 'silver' }]}
                                    source={{ uri: item.uri }}
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

              ) : <Text>Mul Images</Text>} */}

              {/* <Text>{mulImageArray}</Text> */}

              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Switch
                  trackColor={{ false: "black", true: 'silver' }}
                  thumbColor={isStatusEnabled ? GLOBAL.COLOR.DARK : 'silver'}
                  ios_backgroundColor={GLOBAL.COLOR.LIGHT}
                  onValueChange={() => toggleSwitch()}
                  value={isStatusEnabled}
                />
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <CheckBox
    disabled={false}
    value={isSubmitEnabled}
    onValueChange={() => checkSubmitBtn()}
  />


                {/* <CheckBox
                  value={isSubmitEnabled}
                  onValueChange={() => checkSubmitBtn()}
                />
                 */}
                <Text style={{ marginTop: 5, fontSize: 18 }}> All fields are required...</Text>
              </View>

              <View style={styles.item}>


                <TouchableOpacity style={[styles.btnSubmit, isSubmitEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]}
                  onPress={() => storePressnote(submit)}
                  disabled={isSubmitEnabled == true ? false : true}
                >

                  <Ionicons name="save-outline"
                    color="white"
                    size={30}
                  />
                  <Text style={styles.btnSubmitText}> Submit Data</Text>
                </TouchableOpacity>
                


                <Text>{JSON.stringify(totalPressnote)}</Text>
                <Text>-------------------</Text>
                {/* <Text>{JSON.stringify(pressnoteListData)}</Text> */}
                
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
    padding: 5,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 3,
    borderColor:'silver',
    borderWidth: 1,
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
