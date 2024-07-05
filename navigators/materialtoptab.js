import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingAppointment from "../screen/UpcomingAppointment";
import PastAppointment from "../screen/PastAppointment";


const Tab = createMaterialTopTabNavigator();

const MaterialTobTab = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="upcoming" component={UpcomingAppointment} />
      <Tab.Screen name="past" component={PastAppointment} />
    </Tab.Navigator>
  );
};

export default MaterialTobTab;
