import React, {useContext} from 'react';
import {Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MapView, {Polyline, Circle} from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';
import {Context as LocationContext} from '../context/LocationContext';

const Map = () => {

    const {state: {currentLocation, locations}} = useContext(LocationContext);
    if(!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop:200}}></ActivityIndicator>
    }
    return (
        <SafeAreaView>
            <MapView 
                style={styles.mapStyle}
                initialRegion={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                region={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }} 
                >
                    <Circle 
                    center={currentLocation.coords}
                    radius={50}
                    strokeColor="rgba(158,158,255,1.0)"
                    fillColor="rgba(158,158,255,0.3)">

                    </Circle>
                    <Polyline 
                        coordinates={locations.map(loc => loc.coords)}>
                    </Polyline>
            </MapView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        height: 300,
      },
});

export default Map;