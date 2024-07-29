import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { Feather } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";

const UpcomingSlots = ({
  date,
  time,
  doctor,
  status,
  appointmentType,
  appoitmentId,
  patientId,
  appointmentInformation,
  icon_name,
  type,
  navigation,
  id
}) => {
  const role = useSelector(selectRole);
  const { ConsultantStartConversation } = useContext(AllPostRequest);
  const start = async () => {
    let data = {
      participantId: patientId,
    };
    try {
      const response = await ConsultantStartConversation(data);
      if(response){
         navigation.navigate("chatpage")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="bg-white shadow rounded-lg p-1 m-1 ">
      {role == "user" ? (
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
      ) : (
        <View className="border-b border-gray-200 flex flex-row items-center justify-between p-1">
          <View>
            <Text className="font-bold text-gray-400 ">Date</Text>
            <Text className="font-bold">{date}</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-400 ">Time</Text>
            <Text className="font-bold">{time}</Text>
          </View>
        </View>
      )}

      <View className="flex flex-row items-center justify-between p-1">
        <View>
          <Text className="font-bold">{appointmentType}</Text>
        </View>
        {role == "user" ? (
          <TouchableOpacity className="bg-red-600 opacity-70 rounded w-24 p-2">
            <Text className="text-center text-white font-bold">Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-blue-400  rounded w-36 flex flex-row items-center p-2"
            onPress={
              type === "message" ? start : () => navigation.navigate("meeting")
            }
          >
            <View className="mr-2 ">
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
