import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification from '../screen/Notification';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import MainHome from '../screen/MainHome';
import Appointments from '../screen/Appointments';
import MaterialTobTab from './materialtoptab';

const Tab = createBottomTabNavigator()

const BottomTab = ({navigation}) => {
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
        name="appointments"
        component={MaterialTobTab}
        options={{
          title: "Appointments",
          tabBarIcon: ()=>(
            <Ionicons name="calendar" size={24} color="black"/>
          ),
          headerTitleAlign:'center'
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