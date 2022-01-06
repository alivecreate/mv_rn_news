import React from 'react'
import { View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import GLOBAL from '../Global';

import { useNavigation } from '@react-navigation/native';
export default function DataItemTable(props) {
    const item = props.item;
    const navigation = useNavigation();
    return (
        
        <View style={[styles.tableContainer, { backgroundColor: props.tableBgColor }]}>
            <Text style={[styles.tableText, {
                fontSize: 17, color: props.tableTextNoColor, fontWeight: 'bold',
                textAlign: 'center', backgroundColor: props.tableBgNoColor, flex: 1.5
            }]}>{props.index + 1}</Text>

            <Image style={[styles.image, { flex: 3, height: 50, borderRadius: 2, marginRight: 5, marginTop: 20 }]}
                source={{ uri: props.source }}
            />

            <Text style={[styles.tableText, { flex: 19, }]}>{props.item.title}</Text>
            <View style={[styles.tableButtonContainer, { alignSelf: 'center', flex: 2, }]} >
                <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'tomato' }]}
                    onPress={() => navigation.navigate("EditBulletin", {item} )}
                >
                    <Icon name="comment-edit-outline" color="white" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'black' }]}
                    onPress={() => navigation.navigate("PostDetailScreen",  {item})}
                >
                    <Ionicons name="ios-eye-outline"
                        color="white"
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: 'white' }]}
                    onPress={() => onShare(GLOBAL.BASE_URL + 'news/' + props.item.slug, props.item.title, props.item.subtitle)}
                >
                    <Ionicons name="share-social"
                        color={GLOBAL.COLOR.DARK}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    
    
    tableContainer:{ 
        flex:1,   
        flexDirection: 'row',
        backgroundColor:'#dfe6e9',
        borderBottomColor:'white',
        borderBottomWidth:2,
    },
    tableButtonContainer:{    
        flex:0.8,
        alignContent:'center',
        alignItems:'center'
    },
    
    tableButton:{    
        flex:1,
    },

    buttonIcon:{ width:28, height:28, marginBottom:3, borderRadius:50, marginRight:10
        , marginVertical:8,
    alignItems:'center', justifyContent: 'center'},



});

