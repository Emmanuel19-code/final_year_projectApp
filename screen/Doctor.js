import { View, Text,Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Doctor = () => {
    const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="bg-blue-400 h-52 w-full">
        <Image
          source={require("../assets/portrait-3d-female-doctor.jpg")}
          className="w-20 h-20 rounded-full"
        />
      </View>
    </View>
  );
}

export default Doctor