import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
    SafeAreaView,
    NavigationEvents,
} from "react-navigation";
import { Context as TrackContext } from "../../context/TrackContext";
import { ActionButtonCustom } from "../../components";
import ProductTrailPlaceHolder from "./components/ProductTrailPlaceHolder";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../utils";

var moment = require("moment");

const ProductTrailScreen = ({ navigation }) => {
    const { state: { isFetching, hasError, message, trailList, product }, fetchTracks } = useContext(TrackContext);
    const productId = navigation.getParam("productId");

    const refreshTracks = () => {
        fetchTracks({ productId });
    };

    const renderDetail = (post) => {
        return (
            <View style={styles.feedItem}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={styles.timestamp}>
                                {moment(post.createdDate * 1000).format("DD/MM/YYYY HH:mm:ss")}
                            </Text>
                            <Text style={styles.title}>Organization </Text>
                            <Text style={styles.info}>{post.organization_name}</Text>
                            <Text style={styles.title}>Area </Text>
                            <Text style={styles.info}>{post.area.name}</Text>
                            <Text style={styles.title}>Activity </Text>
                            <Text style={styles.info}>{post.activity.name}</Text>
                            <Text style={styles.title}>GPS </Text>
                            <Text style={styles.info}>{post.gps}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    let content = <ProductTrailPlaceHolder></ProductTrailPlaceHolder>;

    if (!isFetching && !hasError && trailList != null && trailList.length > 0) {
        content = (
            <View style={{ margin: 10 }}>
                {/* <Text style={styles.header}>Product </Text> */}
                <Text style={styles.title}>Product Name </Text>
                <Text style={styles.info}>{product.name}</Text>
                {/* <Text style={styles.title}>Product Id </Text>
                <Text style={styles.info}>{productId}</Text> */}
                <Text style={styles.title}>Category </Text>
                <Text style={styles.info}>{product.categoryName}</Text>
                <Text style={styles.title}>Description </Text>
                {product.description == "" ? (
                    <Text style={styles.info}>N/A</Text>

                ) : (
                    <Text style={styles.info}>{product.description}</Text>
                )}
                <Text style={styles.title}>Certification </Text>
                {product.certificationList.length > 0 ? (
                    product.certificationList.map(item => {
                        return <Text style={styles.info}>{item.name}</Text>;
                    })
                ) : (
                    <Text style={styles.info}>N/A</Text>
                )
                }
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: colors.lightGray,
                        borderBottomWidth: 1,
                    }}
                />
                <FlatList
                    data={trailList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => renderDetail(item)}
                ></FlatList>
            </View >
        );
    }

    return (
        <SafeAreaView SafeAreaView style={styles.container} >
            <NavigationEvents onWillFocus={refreshTracks}></NavigationEvents>
            {content}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray
    },
    timestamp: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.text.default
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text.default
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
        color: colors.text.default
    },
    info: {
        fontSize: 15,
        marginLeft: 10,
        color: colors.text.default
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65",
    },

});

export default ProductTrailScreen;
