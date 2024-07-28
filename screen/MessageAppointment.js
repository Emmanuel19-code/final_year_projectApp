import {  ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import UpcomingSlots from '../components/UpcomingSlots'


const MessageAppointment = ({navigation}) => {
  const [type,setType] = useState("message")
  return (
    <ScrollView className="" showsVerticalScrollIndicator={false}>
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
      <UpcomingSlots
        appointmentInformation={"Start Conversation"}
        icon_name={"message-circle"}
        type={type}
        navigation={navigation}
      />
    </ScrollView>
  );
}

export default MessageAppointment