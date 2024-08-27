import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./bottomTab";
import News from "../screen/News";
import Help from "../screen/Help";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SearchDoctor from "../screen/SearchDoctor";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screen/Profile";
import SChat from "../screen/Chat";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const role = useSelector(selectRole);
  const navigation = useNavigation();
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
              headerShown: true,
              drawerIcon: ({}) => (
                <FontAwesome5 name="hands-helping" size={24} color="black" />
              ),
              drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              },
              headerStyle: {
                backgroundColor: "#f3f4f6",
                borderBottomWidth:0
              },
              headerTitle: "Need Help ?",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 20,
                fontFamily: "",
              },
              headerLeft: () => (
                <TouchableOpacity
                  className="ml-3 justify-center items-center  w-12 h-12 "
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
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
