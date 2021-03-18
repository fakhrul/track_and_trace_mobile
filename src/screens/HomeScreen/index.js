import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { colors } from "../../utils";

const HomeScreen = ({ navigation }) => {
    const addNewStream = () => {
        navigation.navigate("ScanQr");
    };

    return (
        <SafeAreaView style={styles.container} >
            <Header title="Home" navigation={navigation} onPress={() => { alert('More option here') }} ></Header>
            <View style={styles.qrCode}>
                <TouchableOpacity onPress={addNewStream}>
                    <Ionicons name="qr-code" size={150} color={colors.black} />
                </TouchableOpacity>
            </View>
            <Text style={{ alignSelf: "center" }}>Click to scan</Text>
        </SafeAreaView>

    );
};

HomeScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    qrCode: {
        backgroundColor: "white",
        marginTop: 200,
        justifyContent: "center",
        alignItems: "center",
    },
});


export default HomeScreen;