import React, { Component } from 'react';
import {View, ImageBackground, Text, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const ImageItems = (props) => {
    return(
        <>
        <View style={styles.GridViewContainer}>
            <Text>{props.index}</Text>
            <View style={{ borderRadius: 40, padding: 1 }}
                key={props.key}
            >
                <ImageBackground
                    style={[styles.imageThumbnail, { width: width / 5.5, borderWidth: 1, borderColor: 'silver' }]}
                    source={{ uri: GLOBAL.BASE_URL + `web/media/xs/` + item }}
                    imageStyle={{ borderRadius: 6 }}
                >
                </ImageBackground>
            </View>
        </View>
    </>

    )
}

const styles = StyleSheet.create({

    imageThumbnail: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flex: 1,
        height: width / 5.5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
})


export default ImageItems;