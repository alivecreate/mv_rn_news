import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import GLOBAL from '../Global';
export default function Spinner(props) {
    return (
        <View style={[styles.container, styles.horizontal]}>
             <ActivityIndicator size={props.size} color={GLOBAL.COLOR.DARK} />   
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginTop:50
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  