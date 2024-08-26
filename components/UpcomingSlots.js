import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { Feather } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";
import Toast from "react-native-toast-message";

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
  id,
  setRefresh,
  callId
}) => {
  const role = useSelector(selectRole);
  const { CancelAppointment } = useContext(AllPostRequest);
  const handlePress = () => {
    if (type === "message") {
      const data = { participantId: patientId };
      functionCall(data);
    } else {
      navigation.navigate("newmeeting", {
        participantId: patientId,
        type: type,
      });
    }
  };
  const CloseAppointment = async () => {
    try {
      let data = {
        appointment_id: id,
      };
      const response = await CancelAppointment(data);

      if (response) {
        setRefresh(true)
        showToast(response.data.msg, (type = "success"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showToast = (message, type) => {
    Toast.show({
      type: type,
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
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
          <View className="flex flex-row items-center">
            <TouchableOpacity
              className={
                callId
                  ? "bg-[#007BFF] rounded w-24 p-2 m-1"
                  : "bg-[#007BFF] rounded w-24 p-2 m-1 opacity-70"
              }
              onPress={() => navigation.navigate("newmeeting",{callId:callId})}
            >
              <Text className="text-center text-white font-bold">Join</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-600 opacity-70 rounded w-24 p-2 m-1"
              onPress={CloseAppointment}
            >
              <Text className="text-center text-white font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
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
