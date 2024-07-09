import { View, Text,ScrollView,Image } from 'react-native'
import React from 'react'
import {  useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import HospitalOnMap from '../components/HospitalOnMap';

const NearbyHospital = () => {
     const insets = useSafeAreaInsets();
     const api = "https://maps.googleapis.com/maps/api/place/nearbysearch/output?hospital"
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="flex-1"
    >
      <MapView
        initialRegion={{
          latitude: 5.687,
          longitude: -0.1904,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="muteStandard"
      >
        <Marker
          coordinate={{
            latitude: 5.687,
            longitude: -0.1904,
          }}
          identifier="origin"
          pinColor="blue"
        />
      </MapView>
      <View className="justify-center items-center flex rounded absolute  bottom-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HospitalOnMap rating={5} />
          <HospitalOnMap rating={4} />
          <HospitalOnMap rating={5} />
          <HospitalOnMap rating={4} />
        </ScrollView>
      </View>
    </View>
  );
}

export default NearbyHospital