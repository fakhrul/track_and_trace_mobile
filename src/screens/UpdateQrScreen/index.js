import React, { useState, useContext, useEffect } from 'react';
import { Alert, Linking, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from "react-navigation";
import Header from "../../components/Header";
import url from 'url';
import { Context as TrackContext } from "../../context/TrackContext";
import { ActionButtonCustom } from "../../components";

const UpdateQrScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedMsg, setScannedMsg] = useState("");

  const areaId = navigation.getParam("areaId");
  const activityId = navigation.getParam("activityId");
  const { state: { isFetching, hasError, message }, saveTrack } = useContext(TrackContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const saveProductTrail = (productId) => {
    saveTrack({
      productId, activityId, areaId, gps: "0,0"
    })
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      var path = url.parse(data);
      // var productId = path.pathname.substring(1);
      // var productId = path.pathname.substring(1);
      var productId = path.hash.substring(2);

      if (productId.substring(0, 2) == "0x") {
        saveProductTrail(productId);
      }
      else {
        setScannedMsg(data);
      }
    }
    catch (err) {
    }

    // Alert.alert(
    //   'Open this URL?',
    //   data,
    //   [
    //     {
    //       text: 'Yes',
    //       onPress: () => {
    //         var path = url.parse(data);
    //         var productId = path.pathname.substring(1);
    //         saveProductTrail(productId)
    //       }
    //     },
    //     { text: 'No', onPress: () => { } },
    //   ],
    //   { cancellable: false }
    // );

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container} >
      <Header isBackButton title="Scan QR" navigation={navigation} onPress={() => { alert('More option here') }} ></Header>
      <View style={styles.barcode}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <ActionButtonCustom title={'Tap to Scan Again'} onPress={() => {
          setScanned(false);
          setScannedMsg("");
        }} />}
      </View>
      {scannedMsg != "" ? (
        <Text style={{ alignSelf: "center", marginBottom: 10 }}>Invalid data: {scannedMsg}</Text>
      ) : (null)}

    </SafeAreaView>
  );
}

UpdateQrScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  barcode: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },

});

export default UpdateQrScreen;