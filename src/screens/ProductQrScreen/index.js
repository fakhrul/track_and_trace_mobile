import React, { useState, useEffect } from 'react';
import { Alert, Linking, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from "react-navigation";
import Header from "../../components/Header";
import url from 'url';
import { ActionButtonCustom } from "../../components";

const ProductQrScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedMsg, setScannedMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const navigateToProductTrail = (productId) => {
    navigation.navigate("ProductTrail", { productId: productId });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('asdsa')
    setScanned(true);

    try {
      var path = url.parse(data);
      // var productId = path.pathname.substring(1);
      var productId = path.hash.substring(2);
      if (productId.substring(0, 2) == "0x") {
        navigateToProductTrail(productId);
      }
      else {
        setScannedMsg(data);
      }
    }
    catch (err) {
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container} >
      <Header title="Scan QR" isBackButton navigation={navigation} onPress={() => { alert('More option here') }} ></Header>
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
    </SafeAreaView >
  );
}

ProductQrScreen.navigationOptions = () => {
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

export default ProductQrScreen;