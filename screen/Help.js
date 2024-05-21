import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Help = () => {
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
      <Text>Help</Text>
    </View>
  );
}

export default Help