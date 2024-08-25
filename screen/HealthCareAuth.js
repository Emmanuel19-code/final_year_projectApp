import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllPostRequest } from "../context/allpostRequest";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";
import { saveToken } from "../store/tokenSlice";
import { Logged, SetUser } from "../store/authSlice";

const HealthCareAuth = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [healthworkerId, setHealtworkerId] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();
  const { ConsultantSignIn, error_message, setError_message } =
    useContext(AllPostRequest);
  const staff = async () => {
    setIsloading(true);
    setDisable(true);
    const response = await ConsultantSignIn(
      email.trim(),
      password.trim(),
      healthworkerId.trim()
    );
      if (response) {
        setIsloading(false);
        setDisable(false);
        dispatch(
          saveToken({
            refreshToken: response.data.userInfo.refreshtoken,
            accessToken: response.data.userInfo.accesstoken,
          })
        );
        dispatch(SetUser(response.data.userInfo));
        dispatch(Logged("admin"));
       
        
    }
  };
  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      setDisable(false);
      const timer = setTimeout(() => {
        setError_message("");
      }, 1000);
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
      <ScrollView className="p-2  h-screen ">
        <View className="mt-5">
          <Text className="text-xl font-bold m-1">Consultant Sign In</Text>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">A Healthcare Professional ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("consultantregister")}
            >
              <Text className="ml-2 text-blue-600 font-bold">Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Email</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Lincense Number</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            value={healthworkerId}
            onChangeText={(text) => setHealtworkerId(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
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
          onPress={staff}
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
      </ScrollView>
    </View>
  );
};

export default HealthCareAuth;
