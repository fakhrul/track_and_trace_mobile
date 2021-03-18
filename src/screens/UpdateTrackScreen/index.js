import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, NavigationEvents } from "react-navigation";
import Header from "../../components/Header";
import { Picker } from '@react-native-picker/picker';
import { Context as TrackContext } from "../../context/TrackContext";
import { Button, FlatList, ScrollView } from 'react-native';
import UpdateTrackPlaceHolder from "./components/UpdateTrackPlaceHolder";
import { ActionButtonCustom } from "../../components";
import { colors } from "../../utils";

const UpdateTrackScreen = ({ navigation }) => {
    const { state: { isFetching, hasError, area, activity }, fetchOrganization } = useContext(TrackContext);
    const { state: { profile } } = useContext(AuthContext);
    const [areaId, setAreaId] = useState();
    const [activityId, setActivityId] = useState("");

    const scrollViewRef = useRef();

    const refreshOrganization = () => {
        fetchOrganization({ organizationId: profile.organization.id });
    };

    const proceed = () => {
        navigation.navigate("UpdateQr", { areaId: areaId, activityId: activityId });
    };


    let content = <UpdateTrackPlaceHolder></UpdateTrackPlaceHolder>;

    if (!isFetching && !hasError && area != null && area.length > 0) {
        content = (
            <View style={{ margin: 10 }}>
                <View style={{ height: 100 }}></View>
                <Text style={styles.title}>Select Area</Text>
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={areaId}
                    onValueChange={(itemValue) =>
                        setAreaId(itemValue)}
                >
                    {area.length > 0 ? (
                        area.map(item => {
                            return <Picker.Item label={item.name} value={item.id} />;
                        })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}
                </Picker>
                <View style={{ height: 40 }}></View>
                <Text style={styles.title}>Select Activity</Text>
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={activityId}
                    onValueChange={(itemValue) =>
                        setActivityId(itemValue)}
                >
                    {activity.length > 0 ? (
                        activity.map(item => {
                            return <Picker.Item label={item.name} value={item.id} />;
                        })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}
                </Picker>
                <View style={{ height: 100 }}></View>

                <ActionButtonCustom title="Continue" onPress={proceed}></ActionButtonCustom>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container} >
            <NavigationEvents onWillFocus={refreshOrganization}></NavigationEvents>

            <Header title="Add Trail" navigation={navigation} onPress={() => { alert('More option here') }} ></Header>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                style={styles.content}
            >
                {content}
            </ScrollView>
        </SafeAreaView>
    );
};

UpdateTrackScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
        color: colors.text.default
    },
    picker: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        width: "100%",
        fontSize: 20,
        fontWeight: "500",
        color: colors.text.default,
    },
});


export default UpdateTrackScreen;