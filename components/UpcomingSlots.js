import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { Feather } from "@expo/vector-icons";

const UpcomingSlots = ({
  date,
  time,
  doctor,
  appointmentType,
  patientId,
  appointmentInformation,
  icon_name,
  type,
  navigation,
  functionCall,
}) => {
  const role = useSelector(selectRole);

  const handlePress = () => {
    if (type === "message") {
      const data = { participantId: patientId };
      functionCall(data);
    } else {
      navigation.navigate("newmeeting",{participantId:patientId,type:type});
    }
  };

  return (
    <View className="bg-white shadow rounded-lg p-1 m-1">
      <View className="border-b border-gray-200 flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold text-gray-400">Date</Text>
          <Text className="font-bold">{date}</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-400">Time</Text>
          <Text className="font-bold">{time}</Text>
        </View>
        {role === "user" && (
          <View>
            <Text className="font-bold text-gray-400">Doctor</Text>
            <Text className="font-bold">{doctor}</Text>
          </View>
        )}
      </View>

      <View className="flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold">{appointmentType}</Text>
        </View>
        {role === "user" ? (
          <TouchableOpacity className="bg-red-600 opacity-70 rounded w-24 p-2">
            <Text className="text-center text-white font-bold">Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-blue-400 rounded w-36 flex flex-row items-center p-2"
            onPress={handlePress}
          >
            <View className="mr-2">
              <Feather name={icon_name} size={20} color="white" />
            </View>
            <Text className="text-center text-white text-xs font-bold">
              {appointmentInformation}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UpcomingSlots;
