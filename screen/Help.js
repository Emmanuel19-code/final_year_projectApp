import { View, Text } from 'react-native'
import React from 'react'


const Help = () => {
  
  return (
    <View className="bg-gray-100 h-screen p-1">
      <View className="p-2 border-b border-gray-300">
        <Text className="m-1">How do I schedule an appointment ?</Text>
      </View>
      <View className="p-2 border-b border-gray-300">
        <Text className="m-1">What Should I do if I miss a call from a doctor ?</Text>
      </View>
      <View className="p-2 border-b border-gray-300">
        <Text className="m-1">How can I access My medical records?</Text>
      </View>
      <View className="p-2 border-b border-gray-300">
        <Text className="m-1">Is my data secured on this platform ?</Text>
      </View>
      <View className="p-2 border-b border-gray-300">
        <Text className="m-1">What payments method are accepted?</Text>
      </View>
    </View>
  );
}

export default Help