import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HealthCareAuth = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="p-2  h-screen ">
        <View className="mt-5">
          <Text className="text-xl font-bold m-1">Sign In</Text>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300 ">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              className=""
            >
              <Text className="ml-2 text-blue-600  font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">A Healthcare Professional ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text className="ml-2 text-blue-600 font-bold">Sign In Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Email</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 "
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Lincense Number</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 "
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 "
          />
        </View>
        <TouchableOpacity
          className="bg-blue-700 p-3 rounded m-2"
          onPress={() => navigation.navigate("home")}
        >
          <Text className="text-white font-bold text-center">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HealthCareAuth;
