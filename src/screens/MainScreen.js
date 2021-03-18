import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import MapView from "react-native-maps";
// import useSaveTrack from '../hooks/useSaveTrack';
import { Context as TrackContext } from "../context/TrackContext";
import moment from "moment";
import {ActionButtonCustom} from '../components/atoms';

const MainScreen = ({ navigation }) => {
  const { state, saveTrack } = useContext(TrackContext);
  const [isIntervalRun, setIsIntervalRun ] = useState(false);

  const initialState = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [initialPosition, setInitialPosition] = useState(initialState);

  useEffect(() => {
    if (isIntervalRun == false) {
      setInterval(() => {
        const currentTime = moment().format("HHmmss");
        if(moment().format("ss") == "00")
        {
          console.log(currentTime);
          // updateCurrentLocation();
        } 
      }, 1000);

      setIsIntervalRun(true);
    }
  });

  const updateCurrentLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialPosition({
            ...initialPosition,
            latitude,
            longitude,
          });

          // setLocation(position.coords);
          saveTrack({ location: position.coords });
          // saveTrack(location);
        },
        (error) => {
          console.log(error.message);
        },
        { timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <MapView
        style={styles.mapStyle}
        initialRegion={initialPosition}
        region={initialPosition}
        showsUserLocation={true}
      />
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "90%", //for center align
          // alignSelf: "flex-end", //for align to right
          alignSelf: 'center'
        }}
      >
        {/* <Button title="Save My Location" onPress={updateCurrentLocation} /> */}
        <ActionButtonCustom title="Save my location" onPress={updateCurrentLocation} ></ActionButtonCustom>
      </View>
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  mapStyle: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MainScreen;
