import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

const StartMeeting = ({name,setName,meeting_id,setMeeting_id}) => {
  return (
    <View>
      <View className="border border-gray-300 p-2">
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View className="border border-gray-300 p-2">
        <TextInput
          placeholder="Enter meeting Id"
          value={meeting_id}
          onChangeText={(text) => setMeeting_id(text)}
        />
      </View>
      <View className="items-end justify-center flex flex-row m-2 ">
        <TouchableOpacity className="bg-blue-600 w-40 rounded-lg p-2">
          <Text className="text-white text-center">Start Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartMeeting;
