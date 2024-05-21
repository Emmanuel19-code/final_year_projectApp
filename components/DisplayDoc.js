import { View, Text,Image } from 'react-native'
import React from 'react'

const DisplayDoc = () => {
  return (
    <View className="p-2 bg-white w-auto m-1 h-16 shadow flex-row items-center ">
      <View className="w-12 h-12">
        <Image
          source={require("../assets/portrait-3d-female-doctor.jpg")}
          className="w-12 h-12 rounded"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text>Dr Rita</Text>
        <Text>Dietician</Text>
        <Text>fee 300</Text>
      </View>
      <View>
        <Text></Text>
      </View>
    </View>
  );
}

export default DisplayDoc