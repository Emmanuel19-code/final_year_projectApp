import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PastAppointmentSlot from '../components/PastAppointmentSlot'

const PastAppointment = () => {
  return (
    <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
      <PastAppointmentSlot />
      <PastAppointmentSlot />
      <PastAppointmentSlot />
      <PastAppointmentSlot />
      <PastAppointmentSlot />
      <PastAppointmentSlot />
      <PastAppointmentSlot />
    </ScrollView>
  );
}

export default PastAppointment