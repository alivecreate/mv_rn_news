import React,{Component} from 'react'
import {Text, Image, View,TouchableOpacity, Button, StyleSheet, Dimensions} from 'react-native'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient'
import MatrialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native';

import GLOBAL from "../Global";

const SplashScreen =({navigation}) =>{

    const { colors } = useTheme();

    return(
      <View style={styles.container}>
          <View style={styles.header}>
            <Animatable.Text 
                animation="bounceIn"
                duration={1500}
                style={styles.tagline}
            >
            ADMIN PANEL
            </Animatable.Text>
          </View>
          <Animatable.View style={[styles.footer,{
              backgroundColor: colors.background
              }]}
            animation="fadeInUpBig"
          >
              
              <Animatable.Image 
                animation="bounceIn"
                duration={1500}
                source={require('../../assets/mailvadodara-ic.png')}
                style={styles.logo_i}
              >
              </Animatable.Image>

              
              <Animatable.Image 
                animation="bounceIn"
                duration={1500}
                source={require('../../assets/mailvadodara-logo-name.png')}
                style={styles.logo}
              >
              </Animatable.Image>

              <Text style={[styles.title,{
                  
              }]}>www.mailvadodara.com</Text>
              
          </Animatable.View>
          
      </View>
    )
  }
  
  export default SplashScreen;

  const {height} = Dimensions.get('screen');
  const {width} = Dimensions.get('screen');
  const height_logo = height * 0.28;

  const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: GLOBAL.COLOR.DARK
    },
    header:{
        flex:2,
        justifyContent: 'center',
        alignItems:'center'
    },
    tagline:{
        color:'white',
        fontSize:24,
        // backgroundColor:'yellow',
        padding:3,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:25,
        marginTop:15,
    },  
    footer:{
        flex:2,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30,
        
        alignItems:'center'
    },
    logo:{
        width: width*0.90,
        height: 50,
        marginBottom:15
    },
    logo_i:{
        width:120,
        height:120,
        marginBottom:15
    },
    title:{
        color:'gray',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:15,
    },
    text:{
        color:'grey',
        marginTop:5
    },
    button:{
        alignItems:'flex-end',
        marginTop:30
    },
    signIn :{
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSign: {
        color:'#2c2c2c',
        fontWeight:'bold'
    }
});