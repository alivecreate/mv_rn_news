import React, { Component, useState, useEffect, createContext } from 'react'

import { Alert, Modal, Text,
    ToastAndroid,Share, 
    Platform, 
    AlertIOS, } from 'react-native'

// import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';

import HomeScreen from '../Home/HomePosts'
import axios from 'axios';

const GLOBAL = require('../Global');
const PostContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export const PostProvider = (props) => {
  
    const [postData, setPostData] = useState([]);
    const [multiImgName, setMultiImgName] = useState(null);
    const [isLoadingPostData, setIsLoadingPostData] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    
    const [postListData, setPostListData] = useState([]);
    const [postDetailData, setPostDetailData] = useState([]);
    const [postDetailImage, setPostDetailImage] = useState([]);

    const [bulletinDetailData, setBulletinDetailData] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);

    const [bulletinListData, setBulletinListData] = useState([]);

    const [btnMoreImage, setBtnMoreImage] = useState(false);
    const [pressnoteListData, setPressnoteListData] = useState([]);

    const [intervalReq, setIntervalReq] = useState(true);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [postBody, setPostBody] = useState('');
    const [postMul_Images, setPostMul_Images] = useState([]);

    const [submitBulletin, setSubmitBulletin] = useState({ category: null, title: '', subtitle: '',youtube:null, slug: '', body: '',
     image:[], mul_images:[], status:true, admin_id: null });
    

    const [spinnerModalVisible, setSpinnerModalVisible] = useState(false);
    const [spinnerNavigationModalVisible, setSpinnerNavigationModalVisible] = useState(false);
    
    const [mulArray, setMulArray] = useState('');
    
    const [isConnected, SetIsConnected] = React.useState(false);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);

    const [isDeleting, setIsDeleting] = React.useState(false);
    
    const [postMulImageArray, setPostMulImageArray] = useState([]);

    const [file, setFile] = React.useState(null);
    const [fileObj, setFileObj] = React.useState([]);
    const [fileArray, setFileArray] = React.useState([]);
    const [fileArrayDesp, setFileArrayDesp] = React.useState([]);
    
    const [submit, setSubmit] = useState({ category: null, title: '', subtitle: '',youtube:null, slug: '', body: '',
     image:[], mul_images:[], status:true, admin_id: null });

    
     const [update, setUpdate] = useState({ id:null, category: null, title: null, subtitle: null,youtube:null, slug: null, body: null,
     image:[], mul_images:[], status:true, admin_id: null });

    const [image, setImage] = useState([]);
    const [updateImage, setUpdateImage] = useState([]);

    const [mulImageArray, setMulImageArray] = useState('');

    const [mulImages, setMulImages] = useState({ uri: null, width: null, height:null, mime:null });

    const [loginData, setLoginData] = useState([]);
    const [notificationArray, setNotificationArray] = useState([]);

    const [totalPressnote, setTotalPressnote] = useState([]);
    const [totalBulletin, setTotalBulletin] = useState([]);
    const [totalNews, setTotalNews] = useState([]);
    const [isDeletingImage, setIsDeletingImage] = useState(false);
    const [postId, setPostId] = useState(null);

    const [savingData, setSavingData] = useState(false);
    
    
    
    
    async function notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
          AlertIOS.alert(msg);
        }
    }
         
  async function getLoginKey(){
   
    let loginData = await AsyncStorage.getItem('loginData');  
    let getLoginData = JSON.parse(loginData);  
    if(getLoginData !== null){
      setLoginData(getLoginData);
      console.log(JSON.stringify(getLoginData.loginUserData.id));
    }else{
      setLoginData([]);
    }
}


    

  async function checkLoginFn(){

    let loginData = await AsyncStorage.getItem('loginData');  
    let getLoginData = JSON.parse(loginData);  
    if(getLoginData !== null){
      setLoginData(getLoginData);
      // alert('11'+JSON.stringify(getLoginData));

      // notifyMessage('Login Success');
    }else{
      notifyMessage('Please Login Here...');
    }
}

const signOut = async (props) =>{
  
  try {
      await AsyncStorage.removeItem('loginData');
      setLoginData([]);
      return true;
  }
  catch(exception) {
      setLoginData([]);
      return false;
  }
}


const onShare = async (url, title, body) => {
  try {
    const result = await Share.share({
      message:
        'મેઈલ વડોદરા - વડોદરા શહેરના સચોટ ન્યુઝ બુલેટિન અપડેટ...'+"\n"+url+"\n\n",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


const clearPost = ()=> {
  setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:true,
                   admin_id: loginData.loginUserData.id });
                   
  setImage([]);
  setMulImages([]);
  setMulImageArray([]);
  setIsSubmitEnabled(false);
  setIsUpdateEnabled(false);
}
const clearPostUpdate = ()=> {
    // setUpdate({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:true,
    //                   admin_id: loginData.loginUserData.id });

    setImageUpdate([]);
    setMulImagesUpdate([]);
    setMulImageArrayUpdate([]);
    setIsUpdateEnabled(false);
}

async function getPostData() {
    axios.get(GLOBAL.BASE_URL+'api/post/get-posts')
        .then(res => {
            setPostData(res.data);
            setIsLoadingPostData(false);
        })
        .catch(err => {
            alert('get post err- '+err);
        })
}


async function sendNotification(){

  //   alert(notificationArray);
  const data = {
    "included_segments": ["Active Users"],
    "app_id": "59cc4a09-5ee3-43d7-91ea-e2bb0500acd9",
    "contents": {"en":"ડેમોક્રેટિક પાર્ટીની જીતથી નિશ્ચિત થઈ ગયું છે કે અમેરિકામાં હવે જો બાઈડન રાષ્ટ્રપતિ અને કમાલ હેરિસ ઉપરાષ્ટ્રપતિ બનવા જઈ રહ્યાં છે."},
    "title": {"en":"Hello title generated"},
    "data": {"custom_data":"Some Values"},
    // "url": "http://alivecreate.com/",
    // "buttons": [{"id": "id2", "text": "second button", "icon": "ic_launcher"}, {"id": "id1", "text": "first button", "icon": "ic_launcher"}],
    "canceled": true,
    "android_sound": "notification",
    "big_picture": "http://alivecreate.com/front/img/web-design.png",
    "android_channel_id": "085dab4a-15bc-4f90-bc79-9e834016c3e0",
    "small_icon": "ic_action_name",
    "large_icon": "https://mailvadodara.com/front/images/mailvadodara-icon.png",
    "android_accent_color": "black",
    "android_led_color": "black",
    "android_visibility": 1,
     "headings": {
        "en": "1111 News Added - ભારતની દીકરીએ રચ્યો ઈતિહાસ:અમેરિકામાં પહેલા મહિલા ઉપરાષ્ટ્રપતિ બનશે કમલા હેરિસ, એક સાથે 3 રેકોર્ડ બનાવ્યાં 😊"
    }
};
const url = 'https://onesignal.com/api/v1/notifications';
  
const options = {
  method: 'POST',
  headers: {'Authorization': 'Basic YTgxNTVkNWEtOGUxYS00MWE3LTk5NzEtZDcyM2VlZmFmNzVk', 'content-type': 'application/json' },
  data: data,
  url,
};
  axios(options);
}

const getJsonData = async () => {

  axios.get(GLOBAL.BASE_URL +'api/post/get-json-data')
      .then(res => {
          setTotalPressnote(res.data.totalPressnote);

          setTotalNews(res.data.totalNews);
          setTotalBulletin(res.data.totalBulletin);
          setCategoryData(res.data.categories);
          setPostData(res.data.bulletinList10);
          // setPostListData(res.data.postList);
          setPressnoteListData(res.data.pressnoteList);
          
          setIsLoadingPostData(false);

          var newBulletinListData = res.data.bulletinList;
          setBulletinListData([...newBulletinListData]);

          var newPostListData = res.data.postList;
          setPostListData([...newPostListData]);

          // notifyMessage('Data Refreshed');
          // console.log(bulletinListData);
        })
      .catch(err => {
        alert('Network error: Something went wrong...');
      });
  }

  const getBulletinDetailData = (id) =>{

    const formData = new FormData();
    formData.append('id', id);
    axios.post(GLOBAL.BASE_URL+'api/post/get-post-detail',formData)
      .then(res => {
        if(res.data.post !== null){
            setBulletinDetailData(res.data.post);
            setIsLoadingPost(false);
            // setPostMulImageArray(res.data.media);
        }else{
            setIntervalReq(false);
        }
      })
      .catch(err => {
          alert('Network Error : Please check internet or restart app.'+err);
          setIsLoadingPost(false);
      })
}


const getPostDetailData = (id) =>{

    const formData = new FormData();
    formData.append('id', id);
    axios.post(GLOBAL.BASE_URL+'api/post/get-post-detail',formData)
      .then(res => {
        if(res.data.post !== null){
            setPostDetailData(res.data.post);
            setPostDetailImage(res.data.media);
            setIsLoadingPost(false);
            console.info(postDetailData);
            // setPostMulImageArray(res.data.media);
              

        }else{
            setIntervalReq(false);
        }
      })
      .catch(err => {
          alert('Network Error : Please check internet or restart app.'+err);
          setIsLoadingPost(false);
      })
}

const getPressnoteDetailData = (id) =>{
  const formData = new FormData();
  formData.append('id', id);
  axios.post(GLOBAL.BASE_URL+'api/pressnote/get-pressnote-detail',formData)
    .then(res => {
      if(res.data.post !== null){
        
          setPostDetailData(...postDetailData,res.data.post);

          // const resPostBody = res.data.post.body;
          
          setIsLoadingPost(false);
          // alert(postBody);
         if(res.data.post.mul_images !== null){
            const postMul_Images_Aray = res.data.post.mul_images.split(",");
            setPostMul_Images(postMul_Images_Aray);
         }else{
           setPostMul_Images([]);
         }
      }else{
          setIntervalReq(false);
      }
    })
    .catch(err => {
        alert('pressnote details err-  - '+err);
    })
}




async function storePressnote() {
    
  let d = new Date();
  let timefileName = d.getTime();
  const formData = new FormData();
  
formData.append('title', submit.title);
formData.append('category', submit.category.toString());
formData.append('subtitle', submit.subtitle);
formData.append('mul_images', mulImageArray.toString());

formData.append('admin_id', loginData.loginUserData.id.toString());

axios.post(GLOBAL.BASE_URL+'api/post/store-pressnote', formData)
.then(res => {

  setSpinnerModalVisible(false);
  notifyMessage(res.data.message);
  setTotalPressnote(res.data.totalPressnote);
  setPressnoteListData(res.data.pressnoteList);

    clearPost();  
    setMulArray([]);
  }).catch((err) => {
    
  alert(JSON.stringify('errr00 = '+JSON.stringify(err)));

  console.log('err'+JSON.stringify(err));
  setSpinnerModalVisible(false);  
  })
}


//   setSpinnerModalVisible(true);
//     RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/store-pressnote', {
//       Authorization : "Bearer access-token",
//       otherHeader : "foo",
//       'Content-Type' : 'multipart/form-data'
//     }, 
//     [

//       // { name : 'admin_id', data: JSON.stringify(loginData.loginUserData.id)},
//       { name : 'title', data : submit.title},
//       { name : 'category', data: submit.category.toString()},
//       { name : 'subtitle', data: submit.subtitle},
//       { name : 'mul_images', data: mulImageArray.toString()}
      

//     ]).then((res) => {
      
//     setSpinnerModalVisible(false);
//     // notifyMessage(JSON.stringify(res));
//     // console.log(res.data.message);


    
//     // setPostData(...postData, res.data.bulletinList10);
//     // setCategoryData(...categoryData, res.data.categories);
//     // setPostListData(...postListData, res.data.postList);

//     // setBulletinListData(...bulletinListData, res.data.bulletinList);
//     // setPressnoteListData(...pressnoteListData, res.data);
    
//       alert(res.data.totalPressnote);
//       console.log(res.json());

//       setTotalPressnote(...totalPressnote, res.data.totalPressnote);

//     // setTotalBulletin(...totalBulletin, res.data.totalBulletin);
//     // setTotalNews(...totalNews, res.data.totalNews);

//       clearPost();
//     }).catch((err) => {
      
//     alert(JSON.stringify('errr00 = '+JSON.stringify(err)));

//     // notifyMessage(err);
//     console.log('err'+JSON.stringify(err));
//     setSpinnerModalVisible(false);  
//     })
// }

 
async function storePost() {
    // alert('clicked');
  let d = new Date();
  let timefileName = d.getTime();
  setSpinnerModalVisible(true);
  
  const formData = new FormData();
  
  // alert(JSON.stringify(submit.title));

formData.append('title', submit.title);
formData.append('subtitle', submit.subtitle);
formData.append('category', submit.category.toString());
// formData.append('category', 11);
formData.append('youtube', submit.youtube?submit.youtube:'null');
formData.append('image', submit.image);
formData.append('body', submit.body);
formData.append('slug', submit.slug);
formData.append('status', submit.status==true?'1':'0');
formData.append('mul_images', mulImageArray.toString());
formData.append('admin_id', loginData.loginUserData.id.toString());


axios.post(GLOBAL.BASE_URL+'api/post/store-post', formData)
.then(res => {
  alert(JSON.stringify(res.data));
  notifyMessage('Bulletin Submitted...');
  setSpinnerModalVisible(false);
  
  // getJsonData();

  //   clearPost();
  //   setMulArray([]);
  }).catch((err) => {
    

  console.log('err'+JSON.stringify(err));
  console.error(err.response.data); 
  alert(JSON.stringify('errr00 = '+JSON.stringify(err.response.data)));

  setSpinnerModalVisible(false);
  })  
}

async function updatePostNoImage(id) {
  // alert(JSON.stringify(update));

  // alert(update.id);
  // const formData = new FormData();
  // formData.append('id', (update.id).toString());
  // formData.append('title', update.title);
  // formData.append('category', update.category.toString());
  
  // // formData.append('subtitle', update.subtitle);
  // // formData.append('youtube', update.youtube?update.youtube:null);
  // // formData.append('body', update.body);
  // // formData.append('image', update.image);
  // // formData.append('mul_images', mulArray.length==0?'null':mulArray.toString());
  // // formData.append('slug', update.slug);
  // // formData.append('status', update.status==true?1:0);
  
  // setSpinnerModalVisible(true);
  
  
  // axios.post(GLOBAL.BASE_URL+'api/post/update-post',formData)
  //   .then(res => {
  //     notifyMessage(res.data);
  //     setSpinnerModalVisible(false);
      
  //   })
  //   .catch(err => {
  //       alert('update err-  - '+err);
  //       setSpinnerModalVisible(false);

  //   })

  RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/update-post', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data'
  }, 
  
  [
    { name : 'id', data : update.id},
    { name : 'title', data : update.title},
     { name : 'category', data: update.category.toString()},
     { name : 'subtitle', data: update.subtitle},
     { name : 'youtube', data: update.youtube?update.youtube:'null'},
     { name : 'body', data: '<p>'+update.body+'</p>'},
     { name : 'slug', data: update.slug},
    //  { name : 'image', data: update.image},

     
      { name : 'mul_images', data: mulArray.length==0? null :mulArray.toString()},
      { name : 'status', data: update.status==true?'1':'0'}
      

  ]).then((resp) => {
    
  setSpinnerModalVisible(false);
  console.log(resp.data);
  notifyMessage('no img');

  getJsonData();

    clearPost();
    // ...
  }).catch((err) => {
    
  setSpinnerModalVisible(false);
  alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
    
  })
  
  // const formData = new FormData();
  // formData.append('ids',  id.toString());
  // formData.append('title', update.title);
  // formData.append('category', update.category.toString());
  // formData.append('subtitle', update.subtitle);
  // formData.append('youtube', update.youtube?update.youtube:null);
  // formData.append('body', update.body);
  // formData.append('image', update.image);
  // formData.append('mul_images', mulArray.length==0?'null':mulArray.toString());
  // formData.append('slug', update.slug);
  // formData.append('status', update.status==true?1:0);
  
  // setSpinnerModalVisible(true);
  
  
  // axios.post(GLOBAL.BASE_URL+'api/post/update-post',formData)
  //   .then(res => {
  //     console.log(res.data);
  //     notifyMessage(res.data);
  //     setSpinnerModalVisible(false);
      
  //   })
  //   .catch(err => {
  //       alert('update err-  - '+JSON.stringify(err));
  //       setSpinnerModalVisible(false);

  //   })

    //old
  
  // alert(update.id);
  // const formData = new FormData();
  // formData.append('id', update.id.toString());
  
  // formData.append('title', update.title);
  // // formData.append('category', update.category.toString());
  // // formData.append('subtitle', update.subtitle);
  // // formData.append('youtube', update.youtube?update.youtube:null);
  // // formData.append('body', update.body);
  // // formData.append('image', update.image);
  // // formData.append('mul_images', mulArray.length==0?'null':mulArray.toString());
  // // formData.append('slug', update.slug);
  // // formData.append('status', update.status==true?'1':'0');
  
  // setSpinnerModalVisible(true);
  
  
  // axios.post(GLOBAL.BASE_URL+'api/post/update-post',formData)
  //   .then(res => {
  //     notifyMessage(res.data);
  //     setSpinnerModalVisible(false);
      
  //   })
  //   .catch(err => {
  //       alert('update err-  - '+err);
  //       setSpinnerModalVisible(false);

  //   })
}

 const clearData = (type) =>{
  if(type == 'bulletin'){
    setUpdateImage([]);
    clearPost();
    setMulArray([]);
    
    notifyMessage('Bulletin Added');
  }

  if(type == 'bulletin_form_clear'){
    setUpdateImage([]);
    clearPost();
    setMulArray([]);
    
    setSpinnerModalVisible(false);
    notifyMessage('Form Data Clear');
  }
}

const savingDataFn = () =>{
  setSavingData(true);
  
  setTimeout(() => {
    setSavingData(false);
    setSpinnerModalVisible(false);
  }, 1500);
}


async function storeBulletin() {
  
// alert(JSON.stringify(submit));
  
  let d = new Date();
  let timefileName = d.getTime();
 
    var ext = /^.+\.([^.]+)$/.exec(image.path);
    var fileExt =  ext[1];

    await RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/store-post', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      { name : 'avatar', filename : timefileName+'.'+fileExt, 
       type:'avatar/'+fileExt,
       data: image.data,
      },

      { name : 'title', data : submit.title},
      { name : 'category', data: String(submit.category)},
      { name : 'subtitle', data: submit.subtitle},
      { name : 'youtube', data: submit.youtube?submit.youtube:'null'},
      { name : 'body', data: '<p>'+submit.body+'</p>'},

      { name : 'slug', data: submit.slug},
      { name : 'status', data: submit.status==true?'1':'0'},
      { name : 'admin_id', data: loginData.loginUserData.id.toString()},

    ]).then((resp) => {
      // console.info(JSON.stringify(resp.data));
      notifyMessage('Bulletin Submitted...');  
      getJsonData();
      setPostId(resp.data);
      
    setSpinnerModalVisible(true);
      // setSpinnerModalVisible(false);
      
      // alert(resp.data);
    
      // alert(JSON.stringify(resp.data));
      // setSpinnerModalVisible(false);
      clearPost();
    }).catch((error) => {
      // notifyMessage(JSON.stringify(resp));

      // setSpinnerModalVisible(false);

      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      
      // alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
    })
}

async function finalMulImageUpload() { 
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


async function updatePostFn(type, updateBulletin) {
  // alert(JSON.stringify(updateBulletin));
  setSavingData(true);
  let d = new Date();
  let timefileName = d.getTime();
 
    
  if(updateImage.path){
    
    var ext = /^.+\.([^.]+)$/.exec(updateImage.path);
    var fileExt =  ext[1];
    
    let imageArr = {
        name : 'avatar', filename : timefileName+'.'+fileExt, 
       type:'avatar/'+fileExt,
       data: updateImage.data,
    }

  }else{
    // alert('not');
    let imageArr = {
        name : 'avatar', 
        data: 'null',
    }
  }


    setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/update-post', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      {  name : 'avatar', filename : timefileName+'.'+fileExt, 
       type:'avatar/'+fileExt,
       data: updateImage.data,
      },

      { name : 'id', data : updateBulletin.id.toString()},
      { name : 'title', data : updateBulletin.title},
      { name : 'category', data: updateBulletin.category.toString()},
      { name : 'subtitle', data: updateBulletin.subtitle},
      { name : 'youtube', data: updateBulletin.youtube?updateBulletin.youtube:'null'},
      { name : 'body', data: '<p>'+updateBulletin.body+'</p>'},
      { name : 'slug', data: updateBulletin.slug},
      { name : 'status', data: updateBulletin.status==true?'1':'0'},
      { name : 'admin_id', data: loginData.loginUserData.id.toString()},

    ]).then((resp) => {

      setSavingData(false);
      if(type == 'bulletin'){      
        notifyMessage("Bulletin Updated");
      }else{      
        notifyMessage("News Updated");
      }

      getJsonData();
      setSpinnerModalVisible(false);
    }).catch((err) => {
      setSavingData(false);
      setSpinnerModalVisible(false);
    })
}


async function updatePressnote() {

  let d = new Date();
 
    setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/update-pressnote', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      
      { name : 'id', data : update.id.toString()},
      { name : 'title', data : update.title},
      { name : 'category', data: update.category.toString()},
      { name : 'subtitle', data: update.subtitle},
      { name : 'mul_images', data: mulArray.length==0?'null':mulArray.toString()},
      { name : 'status', data: update.status==true?'1':'0'},
      { name : 'admin_id', data: JSON.stringify(loginData.loginUserData.id)},
     
    ]).then((resp) => {
      notifyMessage(resp.data);
      // console.log(resp.data);

      setSpinnerModalVisible(false);
      // clearPost();
      
    }).catch((err) => {
      setSpinnerModalVisible(false);
    })
}


const uploadMultipleFiles = (e) => {
    if (fileArrayDesp.length == 0) {

    } else {
    }
    console.log(fileArrayDesp.length);

    fileObj.push(e.target.files);
    
    setProgress(0);
    setTotalProgress(0);
    setTotalProgress(fileObj[0].length);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArrayDesp.push(URL.createObjectURL(fileObj[0][i]));
      fileArray.push(fileObj[0][i]);
    }

    setFile(fileArray);
    setSubmitBtn('enabled');
    setChooseBtn('disabled');
  }

  
  
  const delPost = (id) => {
    setIsDeleting(true);

    const formData = new FormData();
    formData.append('id', id);
    axios.post(GLOBAL.BASE_URL + 'api/post/del-post', formData)
        .then(res => {
            // alert(JSON.stringify(res.data));
            if(res.data == 'deleted'){
              getJsonData();
              notifyMessage('Item Deleted');
            }
          // setBulletinListData(...bulletinListData, res.data.bulletinList);

          setModalVisible(!modalVisible);
          setIsDeleting(false);
          setImage([]);
          setUpdateImage([]);
                
        })
        .catch(err => {
            alert('Server Error - ' + err);
            setModalVisible(!modalVisible);
            setIsDeleting(false);

            // navigation.goBack();

          })
}

  
const delPressnote = (id) => {
  setIsDeleting(true);
  const formData = new FormData();
  formData.append('id', id);
  axios.post(GLOBAL.BASE_URL + 'api/post/del-pressnote', formData)
      .then(res => {
          alert(JSON.stringify(res.data.bulletinList));
          
        // setBulletinListData(...bulletinListData, res.data.bulletinList);

        setModalVisible(!modalVisible);
        
        setTimeout(function () {
        setIsDeleting(false);
      }, 6000);
              
      })
      .catch(err => {
          alert('Server Error - ' + err);
          setModalVisible(!modalVisible);
          setIsDeleting(false);

          // navigation.goBack();

        })
}



// async function delPost(id) {
//     const formData = new FormData();
//     formData.append('id', id);
    
    
//     axios.post(GLOBAL.BASE_URL+'api/post/del-post',formData)
//       .then(res => {
//           if(res.data.status === 0){
//                 alert('deleted' + JSON.stringify(res.data.posts));

//           }else{
//               alert('not deleted');
//           }
//       })
//       .catch(err => {
//           alert('del post err - '+err);
//       })
// }
  

useEffect(() => {
  let isMounted = true
// alert('data');

    getJsonData();
    checkLoginFn();
  
},[]);


    return(
        <PostContext.Provider value={{ 
                postData, postBody, setPostBody, setPostData, intervalReq, setIntervalReq, postListData, setPostListData, 
                getPostDetailData, getBulletinDetailData, storePost, getPostData ,onShare, getPressnoteDetailData,postId, setPostId, clearData,
                getJsonData, checkLoginFn, getLoginKey, loginData, setLoginData, signOut, postMul_Images, setPostMul_Images,
                categoryData, setCategoryData,postDetailData, notifyMessage, setPostDetailData, modalVisible,
                pressnoteListData, updatePressnote, isDeletingImage, setIsDeletingImage, finalMulImageUpload,
                updateImage, setUpdateImage, storePressnote, spinnerNavigationModalVisible, setSpinnerNavigationModalVisible,
                savingData, setSavingData,savingDataFn, postMulImageArray, setPostMulImageArray, postDetailImage, setPostDetailImage,
                totalPressnote, setTotalPressnote, totalNews, totalBulletin, storeBulletin, btnMoreImage, setBtnMoreImage,
                update, setUpdate, clearPostUpdate, isUpdateEnabled, setIsUpdateEnabled, isDeleting, setIsDeleting,
                setModalVisible, delPost,delPressnote, submit, setSubmit, image, setImage, mulImages, setMulImages, clearPost,
                isSubmitEnabled, setIsSubmitEnabled, bulletinListData, setBulletinListData, bulletinDetailData,
                isLoadingPost, setIsLoadingPost,bulletinDetailData, setBulletinDetailData, isLoadingPostData, setIsLoadingPostData,
                updatePostFn, updatePostNoImage, spinnerModalVisible, setSpinnerModalVisible, multiImgName, setMultiImgName,
                mulImageArray, setMulImageArray, mulArray, setMulArray, notificationArray, setNotificationArray
            }}>
            {props.children}
        </PostContext.Provider>
    )
}
export default PostContext;
