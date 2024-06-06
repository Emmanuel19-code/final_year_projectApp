import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from '../screen/Main';
import Notification from '../screen/Notification';
import Profile from '../screen/Profile';
import SearchDoctor from '../screen/SearchDoctor';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import MainHome from '../screen/MainHome';
import VideoAppointments from '../screen/VideoAppointments';

const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={MainHome}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="searchdoc"
        component={SearchDoctor}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="videoappointment"
        component={VideoAppointments}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab