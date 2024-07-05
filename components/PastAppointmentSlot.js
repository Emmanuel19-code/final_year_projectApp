import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const PastAppointmentSlot = () => {
  return (
    <View className="bg-white shadow rounded-lg p-2 m-1 ">
      <View className="border-b border-gray-200 flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold text-gray-400 ">Date</Text>
          <Text className="font-bold">03 August 2024</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400 ">Time</Text>
          <Text className="font-bold">2:30 pm</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400 ">Doctor</Text>
          <Text className="font-bold">Dr Emmanuel</Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold text-gray-400 ">Date</Text>
          <Text className="font-bold">03 August 2024</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400 ">Time</Text>
          <Text className="font-bold">2:30 pm</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 opacity-70 rounded w-24 p-2">
          <Text className="text-center text-white font-bold">Reshcedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PastAppointmentSlot;
