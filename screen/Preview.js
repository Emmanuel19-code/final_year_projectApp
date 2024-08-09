import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Preview = () => {
    const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text>Preview</Text>
    </View>
  );
}

export default Preview