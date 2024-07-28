import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./bottomTab";
import NearbyHospital from "../screen/NearbyHospital";
import News from "../screen/News";
import Help from "../screen/Help";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SearchDoctor from "../screen/SearchDoctor";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screen/Profile";
import SChat from "../screen/Chat";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const role = useSelector(selectRole)
  return (
    <Drawer.Navigator>
      {role == "user" ? (
        <>
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
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
        
          {/*
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
        */}
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
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
          <Drawer.Screen
            name="searchdoc"
            component={SearchDoctor}
            options={{
              headerShown: false,
              drawerLabel: "Search a for Doctor",
              drawerIcon: ({}) => (
                <Ionicons name="search" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
          <Drawer.Screen
            name="chat"
            component={SChat}
            options={{
              headerShown: false,
              drawerLabel: "Chats",
              drawerIcon: ({}) => (
                <AntDesign name="message1" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
          <Drawer.Screen
            name="profile"
            component={Profile}
            options={{
              headerShown: false,
              drawerLabel: "Profile",
              drawerIcon: ({}) => (
                <AntDesign name="user" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
        </>
      ) : (
        <>
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
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          /> 
          <Drawer.Screen
            name="chat"
            component={SChat}
            options={{
              headerShown: false,
              drawerLabel: "Chats",
              drawerIcon: ({}) => (
                <AntDesign name="message1" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
          <Drawer.Screen
            name="profile"
            component={Profile}
            options={{
              headerShown: false,
              drawerLabel: "Profile",
              drawerIcon: ({}) => (
                <AntDesign name="user" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
