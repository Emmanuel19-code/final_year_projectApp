import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Chat = ({ conversationId, name, email, userIdentity,phone }) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
      className="m-2 border-b p-2 border-gray-300"
      onPress={() =>
        navigation.navigate("chatpage", {
          conversationId:conversationId,
          name:name,
          email:email,
          userIdentity:userIdentity,
          phone:phone
        })
      }
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 items-center justify-center rounded-full bg-slate-200">
          <Image
            source={require("../assets/portrait-3d-female-doctor.jpg")}
            className="w-12 h-12 rounded-full"
          />
        </View>
        <View className="m-1 flex-1">
          <View className="flex-row items-center">
            <Text className="font-bold text-md flex-1">{name}</Text>
            <Text>2</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
              How are you doing today ?
            </Text>
            <View className="w-auto p-1 bg-blue-600 rounded-full justify-center">
              <Text className="text-white text-center">2</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
