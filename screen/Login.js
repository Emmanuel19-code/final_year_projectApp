import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllPostRequest } from "../context/allpostRequest";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";
import { Logged } from "../store/authSlice";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    UserSignIn,
    error_message,
    setError_message,
    success_message,
    setSuccess_message,
  } = useContext(AllPostRequest);
  const [isloading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch()
  const user = () => {
    setIsloading(true);
    setDisable(true);
    UserSignIn(email.trim(), password.trim());
  };

  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      setDisable(false)
      const timer = setTimeout(() => {
        setError_message("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error_message, setError_message]);

  useEffect(() => {
    if (email === "" || password === "" || password.length < 8) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (success_message) {
      setIsloading(false);
      dispatch(Logged())
      const timer = setTimeout(() => {
        setSuccess_message("");
        navigation.navigate("home"); // Navigate to Home screen on successful login
      }, 1000)
      return () => clearTimeout(timer);
    }
  }, [success_message, setSuccess_message, navigation]);

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
      <View className="p-2 h-screen">
        <View className="mt-5">
          <Text className="text-xl font-bold m-1">Sign In</Text>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              className=""
            >
              <Text className="ml-2 text-blue-600 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">A Healthcare Professional?</Text>
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
            className="border border-gray-400 p-1"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          className={
            disable
              ? "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center opacity-60"
              : "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center"
          }
         onPress={user}
          disabled={disable}
        >
          {isloading && (
            <View className="mr-4">
              <Progress.Circle size={20} indeterminate={true} color="white" />
            </View>
          )}
          <Text className="text-white font-bold text-center">Sign In</Text>
        </TouchableOpacity>
        {error_message && (
          <Text className="text-red-500 text-center mt-4 text-lg font-semibold">
            {error_message}
          </Text>
        )}
        {success_message && (
          <Text className="text-blue-600 text-center mt-4 text-lg font-semibold">
            {success_message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Login;
