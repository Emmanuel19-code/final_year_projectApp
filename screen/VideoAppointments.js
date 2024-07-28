import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import UpcomingSlots from "../components/UpcomingSlots";


const VideoAppointments = ({navigation}) => {
  const [type, setType] = useState("video");
  return (
    <ScrollView className="" showsVerticalScrollIndicator={false}>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
      <UpcomingSlots appointmentInformation={"Start Video Call"} icon_name={"video"} type={type} navigation={navigation}/>
    </ScrollView>
  );
};

export default VideoAppointments;
