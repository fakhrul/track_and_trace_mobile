import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Header from "../../components/Header";
import Spacer from "../../components/Spacer";
import AccountPlaceHolder from "./components/AccountPlaceHolder";
import { colors } from "../../utils";
import { ActionButtonCustom } from "../../components";

const AccountScreen = ({ navigation }) => {
    const { state: { profile }, signout } = useContext(AuthContext);

    let content = <AccountPlaceHolder></AccountPlaceHolder>;
    if (profile != null) {
        content = (
            <View>
                <View style={{ height: 100 }}></View>
                <View style={{ margin: 10 }}>
                    <Text style={styles.title}>Profile Name </Text>
                    <Text style={styles.info}>{profile.name}</Text>

                    <Text style={styles.title}>Email </Text>
                    <Text style={styles.info}>{profile.email}</Text>

                    <Text style={styles.title}>Phone </Text>
                    <Text style={styles.info}>{profile.phone}</Text>

                    <Text style={styles.title}>Organization </Text>
                    <Text style={styles.info}>{profile.organization.name}</Text>
                    <View style={{ height: 100 }}></View>
                    <ActionButtonCustom
                        title="Sign Out"
                        onPress={signout}
                    />
                </View>
            </View>
        )

    }
    return (
        <SafeAreaView style={styles.container} >
            <Header title="Profile" navigation={navigation} onPress={() => { alert('More option here') }} ></Header>
            {content}
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = {
    title: 'Profile',
    tabBarIcon: <FontAwesome name="gear" size={20}></FontAwesome>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
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
});


export default AccountScreen;