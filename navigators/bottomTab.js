import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification from '../screen/Notification';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import MainHome from '../screen/MainHome';
import Appointments from '../screen/Appointments';

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
      name='appointments'
      component={Appointments}
      options={{ 
        headerShown:false
       }}
      />
      {/*
       <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
    */}
      {/*
        <Tab.Screen
        name="videoappointment"
        component={VideoAppointments}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
        */}
    </Tab.Navigator>
  );
}

export default BottomTab