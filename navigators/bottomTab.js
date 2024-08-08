import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification from "../screen/Notification";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MainHome from "../screen/MainHome";
import MaterialTobTab from "./materialtoptab";
import {
  clearNotificationFlag,
  selectNotificationFlag,
} from "../store/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { selectRole } from "../store/authSlice";

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
  const hasNewNotification = useSelector(selectNotificationFlag);
  const dispatch = useDispatch();
  const role = useSelector(selectRole)
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={MainHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => dispatch(clearNotificationFlag())}>
              <Ionicons name="notifications" color={color} size={size} />
              {hasNewNotification && (
                <View
                  style={{
                    position: "absolute",
                    right: -6,
                    top: -3,
                    backgroundColor: "red",
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="appointments"
        component={MaterialTobTab}
        options={{
          title: "Appointments",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
