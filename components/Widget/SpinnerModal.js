import React, {useContext} from 'react'
import { View, Text, Modal, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native'
import PostContext from '../Data/PostContext';
import Spinner from './Spinner';

import GLOBAL from "../Global";
const {width, height} = Dimensions.get('window');


export default function SpinnerModal(props) {
    const { spinnerModalVisible, setSpinnerModalVisible } = useContext(PostContext);
    
    const spinValue = new Animated.Value(0)

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })

    return (
        <>
            <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.centeredView}>
        <View style={styles.modalView}>
            
            <Animated.View
            
            animation="bounceIn"
                 style={{ alignItems:'center', alignContent:'center',
                          
            }}>
            
            <Text style={styles.modalText}>{props.spinnerText}</Text>
            
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={40} color={GLOBAL.COLOR.DARK} />   
                </View>
            </Animated.View>
        </View>
        </View>
            
    </Modal>

        </>
    )
}


const styles=StyleSheet.create({
    headerBar:{
        backgroundColor: GLOBAL.COLOR.LIGHT,
        justifyContent: 'space-around',

    },
    headerBarText:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        alignItems:'center',
        alignContent:'center',
        
        
    },

    // Delete Style
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
        padding: 10,
        width:width/1.2,
        height:140,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent:'center'
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
})