import React, { Component } from 'react'
import {
    Text, Image, View, StatusBar,
    TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, Platform
} from 'react-native'

import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
// import {AuthContext} from '../../../components/context'
import axios from 'axios';
// import GLOBAL from '../../Globals';
// 
import GLOBAL from '../Global';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';



const CreateBulletin = ({ navigation }) => {
    

    const [data, setData] = React.useState({
        name:'',
        email: '',
        confirm_password: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    })

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const registerHandle = (name, email , password) =>{

            const obj = {
                name: name,
                email: email,
                password: password
              }
              axios
                .post(GLOBAL.BASE_URL+'titanic/public/api/register',
                  {
                    name: data.name,
                    email: data.email,
                    password: data.name,
                    // _token :'PLVfyefUWfsNGhWFNFNIwbCf9QZEsdBiGgsL5Cqf'
                  }
                  ,{
                    headers: {
                        // 'Accept': 'application/json',
                        // 'X-CSRF-TOKEN': 'PLVfyefUWfsNGhWFNFNIwbCf9QZEsdBiGgsL5Cqf'
                    }}
                )
                .then(response => {
                //   alert(JSON.stringify(response));
                  if(JSON.stringify(response.data.msg) === 'exists'){
                    alert('user exists');
                  }else{
                    alert(JSON.stringify(response.data.msg)); 
                    
                    // const foundUser=()=> {
                    //     return userName == item.username && Password == item.password;
                    // };
                    signIn(data.email, data.password);
                  }
                })
                .catch(error => {
                  alert(JSON.stringify(error));
                });

        // alert('111');
        // alert('name -'+ name + ' email - ' + email + ' password -' + password)
        // const foundUser = Users.filter( item =>{
        //     return name == item.name && Password == item.password;
        // });

        // if(data.name.length ==0 || data.password.length ==0){
        //     Alert.alert('Wrong Input!', 'name or Password field cannot be empty.',[
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if(foundUser.length == 0 ){
        //     Alert.alert('Invalid User!', 'name or Password is Invalid.',[
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // signIn(foundUser);

    }

    const textInputChangeName = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false
            });
        }
    }

    const textInputChangePassword = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                password: val,
                check_textInputChange: true
            });
        }
    }

    
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        })
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        })
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffcc29" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>

                <KeyboardAwareScrollView>
                    <Text style={styles.text_footer}>Name</Text>

                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />

                        <TextInput
                            placeholder="Your Full Name"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChangeName(val)}
                        />
                    </View>


                    <Text style={styles.text_footer}>Email</Text>

                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />

                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >

                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}

                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChangePassword(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="gray"
                                    size={20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="gray"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>


                    {/* <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="gray"
                                    size={20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="gray"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.button}>
                        
                <TouchableOpacity
                    onPress={() => {registerHandle( data.name, data.email, data.password )}}                
                    // onPress={() => {click()}}
                    style={styles.signIn}

                >
                        <LinearGradient
                            colors={['#ffcc29', 'yellow']}
                            style={styles.signIn}
                        >
                            <Text
                                style={[styles.textSign, { color: 'black' }]}
                            >Sing Up</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: 'black',
                                backgroundColor: 'black',
                                borderWidth: 1,
                                marginTop: 15
                            }]}>
                            <Text style={[styles.textSign, {
                                color: 'white'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </Animatable.View>

        </View>
    );
};

export default CreateBulletin;


const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcc29'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text_header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        color: '#05375a',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black',
    },

    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});


//old

// import React, { Component, useState, useContext, useEffect } from 'react'
// import PostContext from '../Data/PostContext';

// import {
//   View, CheckBox, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, FlatList, SafeAreaView,
//   ScrollView, TouchableOpacity, useWindowDimensions, Linking, ActivityIndicator,
//   TouchableRipple, Picker, Switch
// } from 'react-native'

// import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

// // import {} from '../../assets/no-img-xs.png';

// import { Container, Header, Content, Textarea, Form, Item, Input, Button, Label } from 'native-base';
// import ImagePicker from 'react-native-image-crop-picker';


// // import {TextInput} from 'react-native-gesture-handler';
// import RNFetchBlob from 'rn-fetch-blob';
// import { WebView } from 'react-native-webview';
// import axios from 'axios';
// const { width, height } = Dimensions.get('window');
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import HTML from "react-native-render-html";
// import HtmlReader from '../Html/HtmlReader';
// import HeaderBar from '../Header/HeaderBar'
// import { useNavigation } from '@react-navigation/native';
// import SpinnerModal from '../Widget/SpinnerModal';
// import GLOBAL from '../Global';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



// const CreateBulletin = () => {

//   const { postListData, postBody, setPostBody, postDetailData, intervalReq, setIntervalReq, setPostDetailData,
//     categoryData, storePost, setCategoryData, setPostListData, getPostDetailData, clearPost,
//     notifyMessage, submit, setSubmit, image, setImage, mulImages, setMulImages, isSubmitEnabled, setIsSubmitEnabled,
//     spinnerModalVisible, setSpinnerModalVisible, multiImgName, setMultiImgName,
//     mulImageArray, setMulImageArray, getCategories } = useContext(PostContext);

//   const navigation = useNavigation();

//   const [isEnabled, setIsEnabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   const [isLongPress, setIsLongPress] = useState(false);

//   // const [submit, setSubmit] = useState({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });
//   const [selected, setSelected] = useState('');

//   //  const [mulImages, setMulImages] = useState(null);
//   //  const [imagesUri, setImageUri] = useState(null);
//   //  const [imagesWidth, setImageWidth] = useState(null);
//   //  const [imagesHeight, setImageHeight] = useState(null);
//   //  const [imagesMime, setImageMime] = useState(null);

//   const delMulImage = (index) => {

//     var array = [...mulImages];
//     var pos = array.indexOf(index);
//     array.splice(index, 1);
//     setMulImages(array);

//   }
//   const ImageList = (props) => {
//     // alert(JSON.stringify(props));

//     return (
//       <View style={styles.GridViewContainer}>
//         {

//           props.data.uri !== null ?
//             (
//               <>
//                 <View style={{ borderRadius: 40, padding: 4 }}>
//                   <ImageBackground
//                     style={[styles.imageThumbnail, { width: width / 4.4, borderWidth: 1, borderColor: 'silver' }]}
//                     source={{ uri: props.data.uri }}
//                     imageStyle={{ borderRadius: 6 }}
//                   >
//                     <Ionicons
//                       style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: '#ffffffc7', borderRadius: 4 }}
//                       name="trash-sharp"
//                       color={GLOBAL.COLOR.DARK}
//                       size={24}
//                       key={props.data.uri}
//                       onPress={() => delMulImage(props.data.uri)}
//                     />
//                   </ImageBackground>
//                 </View>
//               </>
//             ) : null
//         }
//       </View>
//     )
//   }

//   const handleUload = (imageData) => {


//     const newImage = { uri: `data:${imageData.mime};base64,` + imageData.data, width: imageData.width, height: imageData.height };
//     const binaryDataInBase64 = `data:${imageData.mime};base64,` + imageData.data;

//     RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'fblog/public/api/post/store-post', {
//       Authorization: "Bearer access-token",
//       otherHeader: "foo",
//       'Content-Type': 'multipart/form-data',
//     }, [
//       // element with property `filename` will be transformed into `file` in form data
//       // { name : 'avatar', filename : 'avatar.png', data: binaryDataInBase64},
//       // custom content type
//       { name: 'avatar', filename: `avatar.${imageData.path.split(".")[1]}`, type: `avatar/${imageData.path.split(".")[1]}`, data: binaryDataInBase64 },
//       // part file from storage
//       // { name : 'avatar-foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path_to_a_file)},
//       // elements without property `filename` will be sent as plain text
//       // { name : 'name', data : 'user'},
//       // { name : 'info', data : JSON.stringify({
//       //   mail : 'example@example.com',
//       //   tel : '12345678'
//       // })},
//     ]).then((resp) => {
//       alert(JSON.stringify(resp));
//       console.log(JSON.stringify(resp));
//       // ...
//     }).catch((err) => {
//       // ...
//     })


//   }
//   const videoUpload11 = () =>{
//     let formData = new FormData();
//       formData.append("videoFile", {
//           name: name.mp4,
//           uri: video.uri,
//           type: 'video/mp4'
//       });
//       formData.append("id", "1234567");

//       try {
//           let response = fetch(url, {
//               method: 'post',
//               headers: {
//                   'Content-Type': 'multipart/form-data',
//               },
//               body: formData
//           });
//           return response.json();
//       }
//       catch (error) {
//           console.log('error : ' + error);
//           return error;
//       }
//   }
  
//   const videoUpload = () => {
//     ImagePicker.openPicker({
//       waitAnimationEnd: false,
//       sortOrder: 'desc',
//       includeExif: true,
//       mediaType: 'video',
//       includeBase64: true,
//     })
    
//       .then((images) => {
        
//   let d = new Date();
//   let timefileName = d.getTime();
 
//     var ext = /^.+\.([^.]+)$/.exec(images.path);
//     var fileExt =  ext[1];
//     const binaryDataInBase64 = `data:${images.mime};base64,` + images.path;

//     // alert(JSON.stringify(binaryDataInBase64));


//     // let formData = new FormData();
//     //   formData.append("videoFile", {
//     //       name: timefileName+'.'+fileExt,
//     //       uri: images.path,
//     //       type: 'video/mp4',
//     //       data: binaryDataInBase64
//     //   });

//       let formData = new FormData();
// formData.append("videoFile", {
//     name: timefileName+'.'+fileExt,
//     uri: images.path,
//     type: 'video/mp4'
// });

//     let response = axios(GLOBAL.BASE_URL + 'fblog/public/api/post/upload-video', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//         body: formData
//   }) 
//   .then(res => {
//       alert('res' + JSON.stringify(res));   
//     })
//     .catch(err => {
//         alert('del post err - '+err);
//     })

//     // let response = axios.post(GLOBAL.BASE_URL + 'fblog/public/api/post/upload-video', {

//     //           method: 'post',
//     //           headers: {
//     //               'Content-Type': 'multipart/form-data',
//     //           },
//     //           body: formData
//     //       }) .then(res => {
//     //               // alert('res' + JSON.stringify(res.data));
  
           
//     //     })
//     //     .catch(err => {
//     //         // alert('del post err - '+err);
//     //     })
      
//     // RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'fblog/public/api/post/upload-video', {
//     //   Authorization : "Bearer access-token",
//     //   otherHeader : "foo",
//     //   'Content-Type' : 'multipart/form-data'
//     // },
    
//     //  [
//     //   { name : 'videoFile', 
//     //     filename : timefileName+'.'+fileExt, 
//     //    type:'videoFile/'+fileExt,
//     //   },
      
//     //   // {name: 'videoFile', filename: 'vid.mp4', data: RNFetchBlob.wrap(images.uri) },
     
//     // ]
//     // ).then((resp) => {
      
//     // alert(JSON.stringify('res = '+JSON.stringify(resp)));
//     // // setSpinnerModalVisible(false);
//     // notifyMessage(resp.data);

//     //   clearPost();
//     //   // ...
//     // }).catch((err) => {
      
//     // // setSpinnerModalVisible(false);
//     // alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
      
//     // })
    

//       // RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'fblog/public/api/post/upload-video', {
//       //   // let response = fetch(GLOBAL.BASE_URL+'fblog/public/api/post/upload-video', {
            
//       //     Authorization : "Bearer access-token",
//       //   otherHeader : "foo",
//       //   'Content-Type' : 'multipart/form-data'
//       // }, [
//       //   { name : 'videoFile', 
//       //     filename : timefileName+'.'+fileExt, 
//       //     type:'videoFile/'+fileExt,
//       //    data: images.path,
//       //   },
//       //   ]).then((resp) => {
        
//       //     alert(JSON.stringify('res = '+JSON.stringify(resp)));
//       //     // setSpinnerModalVisible(false);
//       //     // notifyMessage(resp.data);
      
//       //       // clearPost();
//       //       // ...
//       //     }).catch((err) => {
            
//       //     setSpinnerModalVisible(false);
//       //     alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
            
//       //     })

//       // try {
//       //     // let response = fetch(url, {

//       //       let response = axios.post(GLOBAL.BASE_URL + 'fblog/public/api/post/upload-video', {

//       //         method: 'post',
//       //         headers: {
//       //             'Content-Type': 'multipart/form-data',
//       //         },
//       //         body: formData
//       //     });
//       //     // return response.json();
//       // }
//       // catch (error) {
//       //     console.log('error : ' + error);
//       //     return error;
//       // }


//         // const imageData = images.map((i) => {
//         //   console.log('received image', i);
//         //   return {
//         //     uri: i.path,
//         //     width: i.width,
//         //     height: i.height,
//         //     mime: i.mime,
//         //   };
//         // })
//         // if (mulImages.uri === null || mulImages === '') {
//         //   setMulImages(imageData);
//         // } else {
//         //   setMulImages(prevMulImages => [...prevMulImages, ...imageData]);
//         // }

//         // var d = new Date();
//         // let i = 0;
//         // for (i = 0; i <= images.length; i++) {
//         //   var timefileName = d.getTime();
//         //   var ext = /^.+\.([^.]+)$/.exec(images[0].path);
//         //   var fileExt = ext[1];

//         //   RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'fblog/public/api/post/test-multiple', {
//         //     Authorization: "Bearer access-token",
//         //     otherHeader: "foo",
//         //     'Content-Type': 'multipart/form-data'
//         //   }, [
//         //     {
//         //       name: 'avatar',
//         //       filename: timefileName + '_' + i + '.' + fileExt,
//         //       type: 'avatar/' + fileExt,
//         //       data: images[i].data,
//         //     },


//         //   ]).then((resp) => {
//         //     alert(JSON.stringify(resp.data));

//         //     // ...
//         //   }).catch((err) => {

//         //     alert(JSON.stringify('errr00 = ' + JSON.stringify(err)));
//         //   })
//         // }

//       })
//   }

//   const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
//     ImagePicker.openCamera({
//       cropping: true,
//       width: 500,
//       height: 500,
//       includeExif: true,
//       mediaType,
//       includeBase64: true,
//     })
//       .then((imageData) => {
//         let newFile = {
//           uri: imageData.path,
//           type: `test/${imageData.path.split(".")[1]}`,
//           name: `test.${imageData.path.split(".")[1]}`
//         }

//         var ext = /^.+\.([^.]+)$/.exec(imageData.path);
//         var fileExt = ext[1];

//         // const newImage = { uri:  imageData.path, width: imageData.width, height: imageData.height };
//         setImage(imageData);

//       })
//       .catch((e) => alert('errr parent ' + e));
//   }


//   const pickSingleBase64 = (cropit) => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       includeBase64: true,
//       includeExif: true,
//     })
//       .then((image) => {
//         console.log('received base64 image');
//         const newImage = { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height };
//         setImage(image);

//       })
//       .catch((e) => alert(e));
//   }

//   const pickMultipleBase64 = async (cropit) => {

//     // alert('selected');
//     setIsLoading(true);

//     let fileArray = [];
//     ImagePicker.openPicker({
//       multiple: true,
//       width: 800,
//       height: 800,
//       cropping: cropit,
//       includeBase64: true,
//       includeExif: true,
//     })
//       //multiple

//       .then((images) => {
//         const imageData = images.map((i) => {
//           return {
//             uri: i.path,
//             width: i.width,
//             height: i.height,
//             mime: i.mime,
//           };
//         })
//         setMulImages(imageData);

//         var i = 0;
//         function myLoop() {         //  create a loop function
//           setTimeout(function() {   //  call a 3s setTimeout when the loop is called
//             uploadImg(images, i);       //  your code here
//             i++;                    //  increment the counter
//             if (i < images.length) {           //  if the counter < 10, call the loop function
//               myLoop();             //  ..  again which will trigger another 
//             }                 //  ..  setTimeout()
//           }, 500)
//         }
//         myLoop();  
//         })
//   }

//   async function uploadImg(images, i) {
//     if (i === 0) {
//       setIsLoading(true);
//     }

//       var ext = /^.+\.([^.]+)$/.exec(images[i].path);
//       var fileExt = ext[1];
//       let file = multiImgName + '_' + Math.floor(Math.random() * 99) + i + '.' + fileExt;
//       alert(mulImageArray.length);
//       mulImageArray.push(file);
//       setMulImageArray(mulImageArray.toString());

//       RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'fblog/public/api/post/test-multiple', {
//         Authorization: "Bearer access-token",
//         otherHeader: "foo",
//         'Content-Type': 'multipart/form-data'
//       }, [
//         {
//           name: 'avatar',
//           filename: file,
//           type: 'avatar/' + fileExt,
//           data: images[i].data,
//         },
//       ]).then((resp) => {
//         if (images.length - 1 === i) {
//           alert('uploaded');
//           setIsLoading(false);
//         }
//       }).catch((err) => {
//         alert(JSON.stringify('errr00 = ' + JSON.stringify(err)));
//       })
//   }

//   const delMulImageNew = (index,item) =>{
//     // var array = [...mulArray]; 
//     // ages.findIndex(checkAdult);
    
//     // array.splice(index, 1);
//     var delArray = mulImageArray.split(",");
    
//     // alert(delArray[index]);
    
//     // alert(mulImageArray);

//     // setMulArray(array);
    
//     RNFetchBlob.fetch('POST', GLOBAL.BASE_URL + 'fblog/public/api/post/mob-media-delete-unsaved', {
//       Authorization: "Bearer access-token",
//       otherHeader: "foo",
//       'Content-Type': 'multipart/form-data',
//     }, [
//       { name : 'item', data : delArray[index]},
//     ])
//     .then((resp) => {
      
//       var array = [...mulImages]; 
//       array.splice(index, 1);
      
//       setMulImageArray(array);
//       setMulImages(array);

//       notifyMessage(JSON.stringify(resp.data));
//       console.log(JSON.stringify(resp));
//     }).catch((err) => {
//       alert(JSON.stringify(err));
//     })
//   }

//   const cleanupImages = () => {
//     ImagePicker.clean()
//       .then(() => {
//         console.log('removed tmp images from tmp directory');

//         const newImages = { uri: null, width: null, height: null, mime: null };
//         setImage(newImages);
//         setMulImages(newImages);

//       })
//       .catch((e) => {
//         alert(e);
//       });
//   }



//   const checkSubmitBtn = () => {
//     alert(JSON.stringify(mulImageArray));

//     // setSubmit({ category:e, title: submit.title, subtitle: submit.subtitle, slug:submit.slug, body:submit.body,
//     //   image:submit.image, mul_images:submit.mul_images, status:submit.status });

//     if ((Array.isArray(image) || image.length === 0 || submit.category === '' || submit.category === null || submit.title === '' || submit.subtitle === ''
//       || submit.body === '' || submit.slug === '')) {
//       // alert(image.length);
//       alert('All Field are Required');

//       setIsSubmitEnabled(false);


//     } else {
//       alert('not null');
//       setIsSubmitEnabled(true);
//     }
//   }

//   const changeCategory = (e) => {

//     setSubmit({
//       category: e, title: submit.title, subtitle: submit.subtitle, slug: submit.slug, body: submit.body,
//       image: submit.image, mul_images: submit.mul_images, status: submit.status
//     });
//     // alert(submit.category);
//     // checkSubmitBtn();
//   }
//   const changeTitle = (e) => {
//     setSubmit({
//       category: submit.category, title: e, subtitle: submit.subtitle, slug: submit.slug, body: submit.body, image: submit.image,
//       mul_images: submit.mul_images, status: submit.status
//     });
//     // checkSubmitBtn();

//   }
//   const changeSubHeading = (e) => {
//     setSubmit({
//       category: submit.category, title: submit.title, subtitle: e, slug: submit.slug, body: submit.body, image: submit.image,
//       mul_images: submit.mul_images, status: submit.status
//     });
//     // checkSubmitBtn();

//   }
//   const changeBody = (e) => {
//     var eText = '<p>' + e + '</p>';
//     setSubmit({
//       category: submit.category, title: submit.title, subtitle: submit.subtitle, slug: submit.slug, body: e, image: submit.image,
//       mul_images: submit.mul_images, status: submit.status
//     });
//     // checkSubmitBtn();

//   }
//   const changeSlug = (e) => {
//     setSubmit({
//       category: submit.category, title: submit.title, subtitle: submit.subtitle, slug: e, body: submit.body, image: submit.image,
//       mul_images: submit.mul_images, status: submit.status
//     });
//     // checkSubmitBtn();

//   }
//   const changeStatus = (e) => {
//     setSubmit({
//       category: submit.category, title: submit.title, subtitle: submit.subtitle, slug: e, body: submit.body, image: submit.image,
//       mul_images: submit.mul_images, status: submit.status
//     });
//     // checkSubmitBtn();

//   }
//   const isSubmitEnabledFn = () => {
//     // setIsSubmitEnabled(!isSubmitEnabled);
//     // alert(submit.title);
//     // if(submit.title == null && submit.category == null){
//     //   alert('null - title - ' + submit.title +'category-'+ submit.category );
//     //   setIsSubmitEnabled(false);
//     // }else{
//     //   alert('not null - title - ' + submit.title +'category-'+ submit.category );

//     //   setIsSubmitEnabled(true);

//     // }
//   }

//   useEffect(() => {

//     getCategories();
//     setIsLoading(false);

//     // setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });

//     // alert(submit.title);
//     // alert(JSON.stringify(categoryData));
//     // return(()=>{
//     //   alert('test');
//     // setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });
//     // setSubmit({ uri: '', width: '', height:'', mime:'' });
//     // setSubmit({ uri: null, width: null, height:null, mime:null });
//     // })

//     var d = new Date();
//     var timefileName = d.getTime();
//     setMultiImgName(timefileName);
//     clearPost();

//     return () => { alert('finished') };
//   }, [])


// const longPress = () =>{
//   alert('lognsasa');
//   setIsLongPress(true);
// }

//   return (
//     <>

//       {spinnerModalVisible ?
//         (
//           <>
//             <SpinnerModal spinnerText="Saving New Bulletin..." />
//           </>
//         ) : null}
//       <Container style={styles.container}>
//         <HeaderBar title="Create Bulletin" headerType="createBulletin" icon="document-text-outline" />
//         <Content>
          
//         <KeyboardAwareScrollView>
//                     <Text style={styles.text_footer}>Name</Text>

//                     <View style={styles.action}>

//                         <TextInput
//                             placeholder="Your Full Name"
//                             style={styles.textInput}
//                             autoCapitalize='none'
//                         />
//                     </View>

// </KeyboardAwareScrollView>

//           <View style={{ flex: 1, flexDirection: 'row', height: 160, justifyContent: 'center' }}>
//             <View style={{ flex: 1, margin: 10, }}>
//               <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Main Image</Text>

//               <Image
//                 source={image.path ? { uri: image.path } : require('../../assets/no-img-xs.png')}

//                 style={{ flex: 1, borderWidth: 2, height: width / 5, margin: 4, borderColor: 'black', borderRadius: 4 }}
//               />

//             </View>
//             <View style={{
//               flex: 2,
//               alignItems: 'center', marginTop: 10, justifyContent: 'center'
//             }}>

//               <TouchableOpacity
//                 onPress={() => pickSingleBase64(false)}
//                 style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
//               >

//                 <Ionicons name="ios-images-outline"
//                   color="black"
//                   size={32}
//                 />
//                 <Text style={styles.imageBtnText}>Open Images</Text>
//               </TouchableOpacity>



//               {/* <TouchableOpacity
//           onPress={() => cleanupImages()}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Cleanup All Images</Text>
//         </TouchableOpacity> */}


//               <TouchableOpacity
//                 onPress={() => pickSingleWithCamera(true)}
//                 style={styles.imgButton}
//               >
//                 <Ionicons name="md-camera-outline"
//                   color="black"
//                   size={32}
//                 />

//                 <Text style={styles.imageBtnText}>Capture Image</Text>
//               </TouchableOpacity>

//               {/* <TouchableOpacity
//                 onPress={() => pickMultiple()}
//                 style={[styles.imgButton,{backgroundColor: 'whitesmoke',}]}
//                 >
                    
//                     <Ionicons name="ios-images-outline"
//                             color="black"
//                             size={32}
//                             />
//                 <Text style={styles.imageBtnText}>Multiple</Text>
//                 </TouchableOpacity> */}

// <View style={{flexDirection:'row', flex:1}}>
// <TouchableOpacity
//                 onPress={() => pickMultipleBase64()}
//                 style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
//               >
//                 {isLoading == true ?
//                   (<>

//                     <ActivityIndicator size={40} color='black' />
//                     <Text style={styles.imageBtnText}>Uploading...</Text>
//                   </>
//                   ) : (<>
//                     <Ionicons name="ios-images-outline"
//                       color="black"
//                       size={26}
//                     />
//                     <Text style={styles.imageBtnText}>More</Text>
//                   </>
//                   )}
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => videoUpload()}
//                 style={[styles.imgButton, {flex:1, backgroundColor: 'whitesmoke', }]}
//               >
//                 {isLoading == true ?
//                   (<>

//                     <ActivityIndicator size={40} color='black' />
//                     <Text style={styles.imageBtnText}>Uploading...</Text>
//                   </>
//                   ) : (<>
//                     <Ionicons name="ios-images-outline"
//                       color="black"
//                       size={26}
//                     />
//                     <Text style={styles.imageBtnText}>Video</Text>
//                   </>
//                   )}
//               </TouchableOpacity>

//               </View>


//             </View>
//           </View>

//           <Form style={styles.formContainer}>


//             {mulImages.uri !== null ? (
//               //   <View style={{flex:1, flexDirection:'column', justifyContent: 'center', height:200}}>
//               <SafeAreaView style={{ flex: 1 }}>
//                 <FlatList
//                   data={mulImages}
//                   renderItem={({ item, index }) =>
//                     <View style={styles.GridViewContainer}>
//                       {/* <ImageList 
//                     data={item} 
//                     index={index}
//                     numColumns={4}
//                     keyExtractor={(item, index) => index}
//                 /> */}

//                       {
//                         mulImages.uri !== null ?
//                           (
//                             <>
//                               <View style={{ borderRadius: 40, padding: 4 }}>
//                                 <ImageBackground
//                                   style={[styles.imageThumbnail, { width: width / 4.4, borderWidth: 1, borderColor: 'silver' }]}
//                                   source={{ uri: item.uri }}
//                                   imageStyle={{ borderRadius: 6 }}
//                                 >
//                                   <Ionicons
//                                     style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: '#ffffffc7', borderRadius: 4 }}
//                                     name="trash-sharp"
//                                     color={GLOBAL.COLOR.DARK}
//                                     size={24}
//                                     key={index}
//                                     onPress={() => delMulImageNew(index,item)}
//                                   />
//                                 </ImageBackground>
//                               </View>
//                             </>
//                           ) : null
//                       }

//                     </View>}
//                   numColumns={4}
//                 />


//               </SafeAreaView >

//             ) : <Text>Mul Images</Text>}

//             <View style={styles.item}>
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Category</Label>
//               <View style={styles.textAreaContainer}>

//                 <Picker
//                   mode="dropdown"
//                   iosHeader="Select your SIM"
//                   iosIcon={<Icon name="arrow-down" />}
//                   style={{ width: undefined }}
//                   selectedValue={submit.category}
//                   onValueChange={(e) => changeCategory(e)}
//                 >
//                   <Picker.Item label="Please Select Category" key={0} value={null} />

//                   {
//                     categoryData.map((category) => {
//                       return (
//                         <Picker.Item label={category.name} key={category.id} value={category.id} />
//                       )
//                     })
//                   }
//                 </Picker>

//               </View>
//             </View>
//             <TextInput
//                   onFocus={()=>longPress()}
//                   editable={true}
//                   name="title"
//                   onChangeText={(e) => changeTitle(e)}
//                   defaultValue={submit.title}
//                   style={styles.textArea} rowSpan={5} bordered placeholder="Titlte of bulletin" />

//             <View style={styles.item}>
              
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Title</Label>
//               <View style={styles.textAreaContainer}>
//                 <TextInput
//                   onFocus={()=>longPress()}
//                   editable={true}
//                   name="title"
//                   onChangeText={(e) => changeTitle(e)}
//                   defaultValue={submit.title}
//                   style={styles.textArea} rowSpan={5} bordered placeholder="Titlte of bulletin" />

                  
//               </View>
              
//             </View>

//             <TextInput
//                             placeholder="Your Email"
//                             autoCapitalize='none'
//                         />
//             <View style={styles.item}>
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Sub Heading</Label>
//               <View style={styles.textAreaContainer}>
//                 <TextInput
//                   editable= {true}
//                   defaultValue={submit.subtitle}
//                   onChangeText={(e) => changeSubHeading(e)}
//                   style={styles.textArea} rowSpan={5} bordered placeholder="Sub Heading of bulletin" />
//               </View>
//             </View>

//             <View style={styles.item}>
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Youtube Video</Label>
//               <View style={styles.textAreaContainer}>
//                 <TextInput
//                 editable= {true}
//                   defaultValue={submit.subtitle}
//                   onChangeText={(e) => changeSubHeading(e)}
//                   style={styles.textArea} rowSpan={5} bordered placeholder="Youtube Link" />
//               </View>
//             </View>

//             <View style={styles.item}>
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Body</Label>
//               <View style={styles.textAreaContainer}>
//                 <Input
//                   multiline={true}
//                   onChangeText={(e) => changeBody(e)}
//                   style={[styles.textArea, { height: 150 }]} rowSpan={5} bordered placeholder="Textarea" />
//               </View>
//             </View>

//             <View style={styles.item}>
//               <Label style={styles.labelStyle}><Text style={styles.spanText}>* </Text>Slug</Label>
//               <View style={styles.textAreaContainer}>
//                 <Input
//                 editable= {true}
//                 selectTextOnFocus
//                   onChangeText={(e) => changeSlug(e)}
//                   defaultValue={submit.slug}
//                   style={[styles.textArea, { }]} rowSpan={5} bordered placeholder="Url Slug" />

//                 {/* <RichEditor
//         initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
//       /> */}

//               </View>
//             </View>

//             {/* <View style={[styles.item,{alignContent:'center', justifyContent:'space-around'}]}>
//       <Label style={styles.labelStyle}><Text style={[styles.spanText,{marginRight:50}]}>* </Text>Status   
      
//       </Label>
//       <Switch
//         trackColor={{ false: "#767577", true: "#81b0ff" }}
//         thumbColor={isEnabled ? GLOBAL.COLOR.DARK : "#f4f3f4"}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={(toggleSwitch)}
//         value={isEnabled}
//       />
//   </View> */}

//             <View style={{ flexDirection: 'row', marginVertical: 10 }}>
//               <CheckBox
//                 value={isSubmitEnabled}
//                 onValueChange={() => checkSubmitBtn()}
//               />
//               <Text style={{ marginTop: 5, fontSize: 18 }}> All fields are required...</Text>
//             </View>

//             <View style={styles.item}>

//               <TouchableOpacity style={[styles.btnSubmit, isSubmitEnabled == true ? styles.btnSubmitEnable : styles.btnSubmitDisable]}
//                 onPress={() => storePost(submit)}
//                 disabled={isSubmitEnabled == true ? false : true}
//               >

//                 <Ionicons name="save-outline"
//                   color="white"
//                   size={30}
//                 />
//                 <Text style={styles.btnSubmitText}> Submit Data</Text>
//               </TouchableOpacity>


//               <Container>

//               </Container>


//             </View>



//           </Form>
//         </Content>
//       </Container>
//     </>
//   )




// }

// const styles = StyleSheet.create({
//   btnSubmit: {
//     alignItems: 'center',
//     padding: 14,
//     flexDirection: 'row',
//     alignContent: 'center',
//     justifyContent: 'center'
//   },
//   btnSubmitEnable: {
//     backgroundColor: GLOBAL.COLOR.DARK,
//   },
//   btnSubmitDisable: {
//     backgroundColor: 'gray',
//     color: 'black'
//   },
//   btnSubmitText: {
//     color: 'white',
//     fontSize: 19,
//     textTransform: 'uppercase'

//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//     fontWeight: "bold"
//   },
//   GridViewContainer: {
//     backgroundColor: 'white',
//     flex: 1,

//   },

//   textAreaContainer: {
//     borderColor: 'silver',
//     borderWidth: 1,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 5,
//     marginVertical: 6,
//     backgroundColor: 'whitesmoke',
//   },

//   imageThumbnail: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginBottom: 4,
//     flex: 1,
//     height: 100,
//     borderWidth: 3,
//     borderColor: 'white',
//     borderRadius: 10,
//   },

//   spanText: {
//     color: 'red',
//   },
//   imageBtnText: {
//     fontSize: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'flex-start',
//     alignSelf: 'center'
//   },

//   imgButton: {
//     backgroundColor: 'silver',
//     alignContent: 'center',
//     padding: 5,
//     width: '100%',
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     borderRadius: 3,
//     borderWidth: 1,
//     borderColor: 'silver',
//     marginBottom: 4
//   },
  
//   item: {
//     marginBottom: 4
//   },
//   textArea: {
//     fontSize: 18,
//     height: 90,
//     marginVertical: 2,
//   },
//   labelStyle: {
//     fontSize: 18,
//     color: 'black',
//     fontWeight: '700'
//   },
//   formContainer: {
//     padding: 12,
//   },
//   formItem: {
//     marginBottom: 4
//   },
//   inputStyle: {

//     fontSize: 18,
//     color: '#333',
//   },

//   container: {
//     flex: 1,
//     paddingTop: 4,
//     marginTop: 10,
//   },
//   postTitle: {
//     fontSize: 20,
//     color: 'black',
//   },
//   content: {
//   },
//   buttonIcon: {
//     width: 28, height: 28, marginBottom: 3, borderRadius: 50, marginRight: 10
//     , marginVertical: 8,
//     alignItems: 'center', justifyContent: 'center'
//   },

//   tableContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#dfe6e9',
//     borderBottomColor: 'white',
//     borderBottomWidth: 2,

//   },
//   tableButtonContainer: {
//     flex: 0.8,
//     alignContent: 'center',
//     alignItems: 'center'
//   },

//   tableButton: {
//     flex: 1,
//   },

//   pageTitle: {
//     fontSize: 19,
//     marginBottom: 10,
//     fontWeight: '700',
//     color: 'black',
//     backgroundColor: 'white',
//     borderBottomColor: 'silver',
//     borderBottomWidth: 1,
//     textAlign: 'center',
//     paddingVertical: 8,
//     marginTop: 10,
//   },
//   tableText: {
//     fontSize: 19,
//     marginHorizontal: 2,
//     paddingHorizontal: 4,
//     fontWeight: '600',
//     color: '#2d3436',
//     marginVertical: 10,

//   },
//   homeTop: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   homeTopBlock: {
//     flex: 3,
//     justifyContent: 'center',
//     padding: 4,
//     alignItems: 'center',
//     height: 90,
//     borderRadius: 6,
//     marginHorizontal: 4,

//   },
//   title: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#2d3436'
//   },
//   postContainer: {

//   }
// })

// export default CreateBulletin;