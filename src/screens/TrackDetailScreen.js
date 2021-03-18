import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  SafeAreaView,
  withNavigationFocus,
  NavigationEvents,
} from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import { ListItem } from "react-native-elements";
var moment = require("moment");

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const date = navigation.getParam("date");
  const data = state.find((t) => t._id === date);
  console.log(data.data[0]);
  const locations = data.data.map((o) => ({
    latitude: o.latitude,
    longitude: o.longitude,
  }));

  return (
    <SafeAreaView>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          latitude: data.data[0].latitude,
          longitude: data.data[0].longitude,
        }}
        showsUserLocation={true}
        style={styles.map}
      >
        <Polyline coordinates={locations}></Polyline>
      </MapView>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ListItem
              chevron
              title={moment(item.timestamp).format("DD/MM/YYYY HH:mm:ss")}
              subtitle={`(${item.latitude}` + "," + `${item.longitude})`}
            >
              <View style={{ backgroundColor: "blue", height: 20 }}></View>
            </ListItem>
          );
        }}
      ></FlatList>

      {/* <NavigationEvents onWillFocus={onScreenFocus}></NavigationEvents> */}
      {/* <Text style={{ fontSize: 48 }}>{track.date}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
