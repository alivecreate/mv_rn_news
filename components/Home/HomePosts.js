import React, { Component } from 'react'
import { View, Text, StyleSheet,Dimensions, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window');

export default function HomePosts(props) {
    return (
        <View style={styles.tableContainer}>
            <Text style={[styles.tableText,{fontSize:17,fontWeight:'bold',backgroundColor:'white'}]}>{props.id}</Text>
            <Text style={[styles.tableText,{width:width/1.2}]}>{props.title}</Text>
            <View  style={[styles.tableButtonContainer,{ alignSelf:'center'}]} >

                <TouchableOpacity style={[{backgroundColor:'silver', width:28, height:28, alignItems:'center'}]} >
                    
                <Icon name="comment-edit-outline" color="black" size={20} />
                </TouchableOpacity>

                <TouchableOpacity  style={[{backgroundColor:'silver', width:35, height:35, alignItems:'center'}]}>
                    
                <Ionicons name="settings-outline"
                                color="black"
                                size={20}
                                 />
                </TouchableOpacity>                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:4,
        paddingVertical: 20,
        height:170,
    },
    tableContainer:{    
        flexDirection: 'row',
        backgroundColor:'whitesmoke',
        borderBottomColor:'silver',
        borderBottomWidth:1,
        borderTopWidth:0.5,
    },
    tableButtonContainer:{    
        flex:1,
        alignContent:'center',
        alignItems:'center'
    },
    
    tableButton:{    
        flex:1,
    },

    pageTitle:{
        fontSize:19,
        marginLeft:10,
        marginBottom:10,
        fontWeight: '700',
        color:'red',
    },
    tableText:{
        fontSize:19,
        marginHorizontal:2,
        paddingHorizontal:2,
        fontWeight:'700'
    },
})
