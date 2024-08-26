import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingAppointment from "../screen/UpcomingAppointment";
import PastAppointment from "../screen/PastAppointment";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import MessageAppointment from "../screen/MessageAppointment";
import VideoAppointments from "../screen/VideoAppointments";
import VoiceCall from "../screen/VoiceCall";


const Tab = createMaterialTopTabNavigator();

const MaterialTobTab = () => {
  const role = useSelector(selectRole)
  return (
    <Tab.Navigator>
      {role == "user" ? (
        <>
          <Tab.Screen name="upcoming" component={UpcomingAppointment} />
          <Tab.Screen name="completed" component={PastAppointment} />
        </>
      ) : (
        <>
          <Tab.Screen
            name="message"
            component={MessageAppointment}
          />
          <Tab.Screen name="Video" component={VideoAppointments}/>
          <Tab.Screen name="voice" component={VoiceCall}/>
        </>
      )}
    </Tab.Navigator>
  );
};

export default MaterialTobTab;
