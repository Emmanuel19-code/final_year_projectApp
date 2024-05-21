import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from './bottomTab';
import NearbyHospital from '../screen/NearbyHospital';
import News from '../screen/News';
import Help from '../screen/Help';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          drawerLabel: "Home",
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 16, // Adjust size as needed
            fontWeight: "bold", // Adjust weight as needed
            color: "black", // Adjust color as needed
          },
        }}
      />
      <Drawer.Screen
        name="Hospital Near Me"
        component={NearbyHospital}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Entypo name="location" size={24} color="black" />
          ),
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 16, // Adjust size as needed
            fontWeight: "bold", // Adjust weight as needed
            color: "black", // Adjust color as needed
          },
        }}
      />
      <Drawer.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="newspaper" size={24} color="black" />
          ),
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 16, // Adjust size as needed
            fontWeight: "bold", // Adjust weight as needed
            color: "black", // Adjust color as needed
          },
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          drawerIcon: ({}) => (
            <FontAwesome5 name="hands-helping" size={24} color="black" />
          ),
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 16, // Adjust size as needed
            fontWeight: "bold", // Adjust weight as needed
            color: "black", // Adjust color as needed
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;