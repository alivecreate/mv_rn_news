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
  // const navigation = useNavigation();

    const [postData, setPostData] = useState([]);
    const [multiImgName, setMultiImgName] = useState(null);
    const [isLoadingPostData, setIsLoadingPostData] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    
    const [postListData, setPostListData] = useState([]);
    const [postDetailData, setPostDetailData] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);

    const [bulletinListData, setBulletinListData] = useState([]);
    const [bulletinDetailData, setBulletinDetailData] = useState([]);

    
    const [pressnoteListData, setPressnoteListData] = useState([]);
    // const [bulletinDetailData, setBulletinDetailData] = useState([]);

    const [intervalReq, setIntervalReq] = useState(true);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [postBody, setPostBody] = useState('');
    const [postMul_Images, setPostMul_Images] = useState([]);

    const [spinnerModalVisible, setSpinnerModalVisible] = useState(false);
    
    const [mulArray, setMulArray] = useState(null);
    
    const [isConnected, SetIsConnected] = React.useState(false);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);

    const [isDeleting, setIsDeleting] = React.useState(false);
    
    const [file, setFile] = React.useState(null);
    const [fileObj, setFileObj] = React.useState([]);
    const [fileArray, setFileArray] = React.useState([]);
    const [fileArrayDesp, setFileArrayDesp] = React.useState([]);
    
    const [submit, setSubmit] = useState({ category: null, title: '', subtitle: '',youtube:null, slug: '', body: '',
     image:[], mul_images:[], status:1, admin_id: 1 });

    
     const [update, setUpdate] = useState({ id:null, category: null, title: null, subtitle: null,youtube:null, slug: null, body: null,
     image:[], mul_images:[], status:1, admin_id: 1 });

    const [image, setImage] = useState([]);
    const [updateImage, setUpdateImage] = useState([]);

    const [mulImageArray, setMulImageArray] = useState('');

    const [mulImages, setMulImages] = useState({ uri: null, width: null, height:null, mime:null });

    const [loginData, setLoginData] = useState([]);
    const [notificationArray, setNotificationArray] = useState([]);

    const [totalPressnote, setTotalPressnote] = useState([]);
    
    
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
      alert('11'+JSON.stringify(getLoginData));
    }else{
      alert('null');
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
      alert('null');
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
  setSubmit({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });
  setImage([]);
  setMulImages([]);
  setMulImageArray([]);
  setIsSubmitEnabled(false);
  setIsUpdateEnabled(false);
}

const clearPostUpdate = ()=> {
    setUpdate({ category: null, title: null, subtitle: null, slug:null, body:null, image:[], status:1, admin_id: 1 });
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

async function getJsonData() {
  axios.get(GLOBAL.BASE_URL+'/api/post/get-json-data')
      .then(res => {
        // alert(JSON.stringify(res.data.bulletinList10));
          setCategoryData(res.data.categories);
          setPostData(res.data.bulletinList10);
          setPostListData(res.data.postList);
          setBulletinListData(res.data.bulletinList);
          setPressnoteListData(res.data.pressnoteList);
          setTotalPressnote(res.data.totalPressnote);
          
          setIsLoadingPostData(false);
        })
      .catch(err => {
        alert('getJSON'+err + 'status-' + err.status + 'header- '+ err.headers);
      })
}

async function getCategories() {
  axios.get(GLOBAL.BASE_URL+'api/post/getCategories')
      .then(res => {
          setCategoryData(res.data);
      })
      .catch(err => {
        alert('category'+err + 'status-' + err.status + 'header- '+ err.headers);
      })
}
async function getPostListData() {
  axios.get(GLOBAL.BASE_URL+'api/post/get-post-list')
      .then(res => {
          setPostListData(res.data);
      })
      .catch(err => {
          alert('get post list - '+err + 'status-' + err.status + 'header- '+ err.headers);
      })
}

async function getBulletinListData() {
  axios.get(GLOBAL.BASE_URL+'api/post/get-bulletin-list')
      .then(res => {
          setBulletinListData(res.data);
      })
      .catch(err => {
          alert('get Bulletin list - '+err + 'status-' + err.status + 'header- '+ err.headers);
      })
}
const getPostDetailData = (id) =>{
    const formData = new FormData();
    formData.append('id', id);
    axios.post(GLOBAL.BASE_URL+'api/post/get-post-detail',formData)
      .then(res => {
        if(res.data.post !== null){
            // setIntervalReq(true);
            setPostDetailData(res.data.post);
           
            const resPostBody = res.data.post.body;
            const getPostBody = resPostBody.replace(/localhost:8000/gi, GLOBAL.IP);
            setPostBody(getPostBody);
            setIsLoadingPost(false);
            // alert(postBody);
           if(res.data.post.mul_images !== null){
              // alert(JSON.stringify(res.data.post.mul_images));
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
          alert('post details err-  - '+err);
      })
    // }, 10000);

    // return () => clearInterval(interval);

}




async function storePressnote() {
    
  let d = new Date();
  let timefileName = d.getTime();

  setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/store-pressnote', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [

      { name : 'id', data: JSON.stringify(loginData.loginUserData.id)},
      { name : 'title', data : submit.title},
       { name : 'category', data: submit.category.toString()},
       { name : 'subtitle', data: submit.subtitle},
        { name : 'mul_images', data: mulImageArray.length==0?'null':mulImageArray}

    ]).then((resp) => {
      
    setSpinnerModalVisible(false);
    notifyMessage(resp.data);

      clearPost();
    }).catch((err) => {
      
    setSpinnerModalVisible(false);
    alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
      
    })
}

 
async function storePost() {
    
  let d = new Date();
  let timefileName = d.getTime();
 
    var ext = /^.+\.([^.]+)$/.exec(image.path);
    var fileExt =  ext[1];

  setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/store-post', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      { name : 'avatar', filename : timefileName+'.'+fileExt, 
       type:'avatar/'+fileExt,
       data: image.data,  
      },
      { name : 'title', data : submit.title},
       { name : 'category', data: submit.category.toString()},
       { name : 'subtitle', data: submit.subtitle},
       { name : 'youtube', data: submit.youtube?submit.youtube:'null'},
       { name : 'body', data: '<p>'+submit.body+'</p>'},
       { name : 'slug', data: submit.slug},

       
        { name : 'mul_images', data: mulImageArray.length==0?'null':mulImageArray}

    ]).then((resp) => {
      
    setSpinnerModalVisible(false);
    notifyMessage(resp.data);

      clearPost();
    }).catch((err) => {
      
    setSpinnerModalVisible(false);
    alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
      
    })
}

async function updatePostNoImage(id) {
  
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
    { name : 'id', data : update.id.toString()},
    { name : 'title', data : update.title},
     { name : 'category', data: update.category.toString()},
     { name : 'subtitle', data: update.subtitle},
     { name : 'youtube', data: update.youtube?update.youtube:'null'},
     { name : 'body', data: '<p>'+update.body+'</p>'},
     { name : 'slug', data: update.slug},
     { name : 'image', data: update.image},

     
      { name : 'mul_images', data: mulArray.length==0?'null':mulArray.toString()},
      { name : 'status', data: update.status==true?'1':'0'}
      

  ]).then((resp) => {
    
  setSpinnerModalVisible(false);
  notifyMessage(resp.data);

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

async function updatePost() {
  let d = new Date();
  let timefileName = d.getTime();
 
    var ext = /^.+\.([^.]+)$/.exec(updateImage.path);
    var fileExt =  ext[1];
    setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/update-post', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      { name : 'avatar', filename : timefileName+'.'+fileExt, 
       type:'avatar/'+fileExt,
       data: updateImage.data,
      },

      { name : 'id', data : update.id.toString()},
      { name : 'title', data : update.title},
      { name : 'category', data: update.category.toString()},
      { name : 'subtitle', data: update.subtitle},
      { name : 'youtube', data: update.youtube?update.youtube:null},
      { name : 'body', data: '<p>'+update.body+'</p>'},
      { name : 'mul_images', data: mulArray.length==0?'null':mulArray.toString()},
      { name : 'slug', data: update.slug},
      { name : 'status', data: update.status==true?'1':'0'},
     

    ]).then((resp) => {
      // alert(JSON.stringify(resp.data));
      notifyMessage(JSON.stringify(resp.data));

      setSpinnerModalVisible(false);
      // clearPost();
    }).catch((err) => {
      
      // alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
    })
}


async function updatePressnote() {
  let d = new Date();
  let timefileName = d.getTime();
 
    var ext = /^.+\.([^.]+)$/.exec(updateImage.path);
    var fileExt =  ext[1];
    setSpinnerModalVisible(true);
    RNFetchBlob.fetch('POST', GLOBAL.BASE_URL+'api/post/update-pressnote', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data'
    }, [
      
      { name : 'id', data: JSON.stringify(loginData.loginUserData.id)},
      { name : 'title', data : update.title},
       { name : 'category', data: update.category.toString()},
       { name : 'subtitle', data: update.subtitle},
        { name : 'mul_images', data: mulImageArray.length==0?'null':mulImageArray},

      { name : 'status', data: update.status==true?'1':'0'},
     

    ]).then((resp) => {
      notifyMessage(JSON.stringify(resp.data));

      setSpinnerModalVisible(false);
      // clearPost();
    }).catch((err) => {
      
      // alert(JSON.stringify('errr00 = '+JSON.stringify(err)));
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
  


async function delPost(id) {
    const formData = new FormData();
    formData.append('id', id);
    
    
    axios.post(GLOBAL.BASE_URL+'api/post/del-post',formData)
      .then(res => {
          if(res.data.status === 0){
                alert('deleted' + JSON.stringify(res.data.posts));

          }else{
              alert('not deleted');
          }
      })
      .catch(err => {
          alert('del post err - '+err);
      })
}
  

useEffect(() => {


  const interval = setInterval(() => {
    // console.log('This will run every second!');
    // notifyMessage('test');
    // getBulletinListData();
    // getCategories();
    // getPostData();
    // getPostListData();
  }, 15000);
  // return (() => notifyMessage('back'));

  // checkLoginFn();
  
},[]);


    return(
        <PostContext.Provider value={{ 
                postData, postBody, setPostBody, setPostData, intervalReq, setIntervalReq, postListData, setPostListData, 
                getPostDetailData,storePost, getBulletinListData, getCategories, getPostData, getPostListData,onShare,
                getJsonData, checkLoginFn, getLoginKey, loginData, setLoginData, signOut, postMul_Images, setPostMul_Images,
                categoryData, setCategoryData,postDetailData, notifyMessage, setPostDetailData, modalVisible,
                pressnoteListData, updatePressnote,
                updateImage, setUpdateImage, storePressnote, totalPressnote, setTotalPressnote,
                update, setUpdate, clearPostUpdate, isUpdateEnabled, setIsUpdateEnabled, isDeleting, setIsDeleting,
                setModalVisible, delPost, submit, setSubmit, image, setImage, mulImages, setMulImages, clearPost,
                isSubmitEnabled, setIsSubmitEnabled, bulletinListData, setBulletinListData, bulletinDetailData,
                isLoadingPost, setIsLoadingPost, setBulletinDetailData, isLoadingPostData, setIsLoadingPostData,
                updatePost, updatePostNoImage, spinnerModalVisible, setSpinnerModalVisible, multiImgName, setMultiImgName,
                mulImageArray, setMulImageArray, mulArray, setMulArray, notificationArray, setNotificationArray
            }}>
            {props.children}
        </PostContext.Provider>
    )
}
export default PostContext;
