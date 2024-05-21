import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";

const HospitalOnMap = ({rating}) => {
  return (
    <TouchableOpacity className="bg-white shadow w-72 h-32 ml-2 p-1 rounded">
      <Text className="font-bold text-xl">Mount Zion Hospital</Text>
      <View className="flex-row items-center">
        <Text className="text-gray-500 mr-1">5.0</Text>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <AntDesign name="star" size={14} color={"yellow"} />
          ))}
      </View>
      <Text className="text-gray-500">
        Hospital Atasemanso, 17 6th Crescent
      </Text>
      <Text className="text-green-700">Open 24 hours</Text>
    </TouchableOpacity>
  );
}

export default HospitalOnMap