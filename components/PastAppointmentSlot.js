import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const PastAppointmentSlot = ({
  date,
  time,
  doctor,
  status,
  appointmentType,
  appoitmentId,
}) => {
  return (
    <View className="bg-white shadow rounded-lg p-2 m-1 ">
      <View className="border-b border-gray-200 flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold text-gray-400 ">Date</Text>
          <Text className="font-bold">{date}</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400 ">Time</Text>
          <Text className="font-bold">{time}</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400 ">Doctor</Text>
          <Text className="font-bold">{doctor}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold text-gray-400 ">Date</Text>
          <Text className="font-bold">{appointmentType}</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 opacity-70 rounded w-24 p-2">
          <Text className="text-center text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PastAppointmentSlot;
