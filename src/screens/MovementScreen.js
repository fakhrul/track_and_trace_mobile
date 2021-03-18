import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { NavigationEvents } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";
var moment = require("moment");

const MovementScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  // console.log(state);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={fetchTracks}></NavigationEvents>
      <Button
        title="Create Tracks"
        onPress={() => navigation.navigate("TrackCreate")}
      />

      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { date: item._id })
              }
            >
              <ListItem chevron title={item._id}></ListItem>

              {/* <ListItem chevron 
                    title={moment(item.timestamp).format("DD/MM/YYYY HH:mm:ss")}
                    subtitle={`(${item.latitude}`+ ',' + `${item.longitude})`}
                    >
                        <View style={{backgroundColor:'blue', height:20}}></View>

                    </ListItem> */}
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

MovementScreen.navigationOptions = {
  title: "Movement",
};
const styles = StyleSheet.create({});

export default MovementScreen;
