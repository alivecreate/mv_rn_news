import React, { useState, useContext } from "react";
import {
  Alert,  Modal,  StyleSheet,  Text,  TouchableHighlight,
  View,Dimensions} from "react-native";
  
import PostContext from '../Data/PostContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Global from "../Global";

const { width, height } = Dimensions.get('window');
const PostDeleteModel = props =>{
    
    // const { id } = route.params;
    const { modalVisible, setModalVisible, delPost } = useContext(PostContext);

    return (
        <>
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure want to delete this post?</Text>
                
                <View style={{flex:1, flexDirection:'row', alignContent:'space-between'}}>
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: Global.COLOR.DARK}}
                    onPress={() => {
                        delPost(props.id);
                    }}
                    >
                    <Text style={styles.textStyle}><Ionicons name="trash-outline" size={22} /> DELETE</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: Global.COLOR.BLACK, }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <Text style={styles.textStyle}><Ionicons name="close" size={22} /> CANCEL</Text>
                    </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          
          <Ionicons name="trash-outline" size={24}
                    style={{color: 'red' , backgroundColor:'white',
                    padding:1, borderRadius:5}}
                    color ='white' 
                    onPress={() => {
                        setModalVisible(true);
                      }}
        ></Ionicons> 
        </>
    )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#0000009e'
  },
  modalView: {
    margin: 4,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    width:width/1.2,
    height:180,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal:4,
    flex:2, alignItems:'center',  justifyContent: 'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:18
  },
  modalText: {
    marginBottom: 15,
    fontSize:20,
    textAlign: "center",
    fontWeight:'bold',
  }
});

export default PostDeleteModel;