import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { AuthApiContext } from "../context/authapi";

const Register = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {
    email,
    setEmail,
    password,
    setPassword,
    consultantId,
    setConsultantId,
    isConsultant,
    setIsConsultant,
    name,
    setName,
    hospitalname,
    setHospitalname,
    consultantcreate,
    usercreate,
  } = useContext(AuthApiContext);
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
          <Text className="text-xl font-bold m-1">Create Account</Text>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300 ">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("login")}
              className=""
            >
              <Text className="ml-2 text-blue-600  font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">A Healthcare Professional ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text className="ml-2 text-blue-600 font-bold">Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Full Name</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Email</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Phone</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Confirm Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
          />
        </View>
        <TouchableOpacity
          className="bg-blue-700 p-3 rounded m-2"
          onPress={() => navigation.navigate("verifyemail")}
        >
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
