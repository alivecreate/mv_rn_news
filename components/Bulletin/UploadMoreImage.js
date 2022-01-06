import React, { Component, useState, useContext, useEffect } from 'react'
import PostContext from '../Data/PostContext';

import {
  View, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, FlatList, SafeAreaView,
  ScrollView, TouchableOpacity, useWindowDimensions, Linking, ActivityIndicator,
  TouchableRipple, Switch
} from 'react-native'

const CreateBulletin = () => {

useEffect(() => {

})



return (
    <>
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

    </>
);
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