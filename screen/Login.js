import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";


const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { UserSignIn, error_message, setError_message } =useContext(AllPostRequest);
  const user = ()=>{
     UserSignIn(email,password)
  }
   setTimeout(() => {
     setError_message("");
   }, 10000);
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
            <TouchableOpacity
              onPress={() => navigation.navigate("healthprofessionalauth")}
            >
              <Text className="ml-2 text-blue-600 font-bold">Sign In Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Email</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 "
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 "
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          className="bg-blue-700 p-3 rounded m-2"
          onPress={user}
        >
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
        {error_message && (
          <Text className="text-red-500 text-center mt-4 text-lg font-semibold">
            {error_message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Login;
