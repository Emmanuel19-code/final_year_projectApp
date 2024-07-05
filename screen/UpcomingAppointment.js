import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import UpcomingSlots from '../components/UpcomingSlots';

const UpcomingAppointment = () =>{
    return (
      <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
        <UpcomingSlots />
        <UpcomingSlots />
        <UpcomingSlots />
        <UpcomingSlots />
        <UpcomingSlots />
        <UpcomingSlots />
      </ScrollView>
    );
}

export default UpcomingAppointment