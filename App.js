import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'

import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext';

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from "./src/screens/HomeScreen"
import ProductQrScreen from "./src/screens/ProductQrScreen"
import SigninScreen from "./src/screens/SigninScreen"
import AccountScreen from "./src/screens/AccountScreen"

import LoadingScreen from "./src/screens/LoadingScreen"

import ProductTrailScreen from "./src/screens/ProductTrailScreen";

import UpdateTrackScreen from "./src/screens/UpdateTrackScreen/";
import UpdateQrScreen from "./src/screens/UpdateQrScreen";


import { Provider as AuthProvider } from "./src/context/AuthContext"
import { setNavigator } from './src/helper/navigationRef';
import { FontAwesome } from '@expo/vector-icons';

const mainFlow = createStackNavigator({
  Home: HomeScreen,
  ScanQr: ProductQrScreen,
  ProductTrail: ProductTrailScreen,
});

mainFlow.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="home" size={20}></FontAwesome>
}

const updateFlow = createStackNavigator({
  UpdateTrack: UpdateTrackScreen,
  UpdateQr: UpdateQrScreen,
})

updateFlow.navigationOptions = {
  title: 'Add Trail',
  tabBarIcon: <FontAwesome name="map" size={20}></FontAwesome>

}

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  anonymousFlow: createStackNavigator({
    Signin: SigninScreen
  }),
  userFlow: createBottomTabNavigator({
    mainFlow,
    updateFlow,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => { setNavigator(navigator) }} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
