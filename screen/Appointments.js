import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Appointments = () => {
   const insets = useSafeAreaInsets();
   return (
     <View
       style={{
         flex: 1,
         paddingTop: insets.top,
         paddingBottom: insets.bottom,
         paddingLeft: insets.left,
         paddingRight: insets.right,
       }}
     >
       <Text>Appointments</Text>
     </View>
   );
};

export default Appointments;
