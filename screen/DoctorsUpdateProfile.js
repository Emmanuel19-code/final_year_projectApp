import { View, Text } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from 'react'

const DoctorsUpdateProfile = ({navigation}) => {
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
      <Text>DoctorsUpdateProfile</Text>
    </View>
  );
}

export default DoctorsUpdateProfile