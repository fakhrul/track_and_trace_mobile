import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProductList = props => {
    var imagePath = "";
    switch(props.imageId){
        case "1":
            imagePath = require('../../images/ktmb_commuter.jpg');
            break;
        case "2":
            imagePath = require('../../images/ktmb_ets.jpg');
            break;
        case "3":
            imagePath = require('../../images/ktmb_intercity.jpg');
            break;
        case "4":
            imagePath = require('../../images/ktmb_parks.jpg');
            break;
        case "5":
            imagePath = require('../../images/ktmb_skypark.jpg');
            break;
        case "6":
            imagePath = require('../../images/rapid_bus.jpg');
            break;
        case "7":
            imagePath = require('../../images/rapid_train.jpg');
            break;
        default:
            imagePath = require('../../images/ktmb_commuter.jpg');
            break;
    }
    return (
        <>
            <Image source={imagePath}></Image>
            <Text>{props.imageSource}</Text>
            <Text>{props.title}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export default ProductList;