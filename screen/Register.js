import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";
import { Verification } from "../store/authSlice";


const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm_pass, setConfirm_pass] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [passhide,setPasshide] = useState(true)
  const [confirmhide,setConfirmhide] = useState(true)
  const dispatch = useDispatch()

  const { UserSignUp, error_message, setError_message } =
    useContext(AllPostRequest);

  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      setDisable(false)
      const timer = setTimeout(() => {
        setError_message("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error_message, setError_message]);

  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      password.length < 8 ||
      name === "" ||
      phone === "" ||
      confirm_pass === "" ||
      confirm_pass.length < 8
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, password, name, phone, confirm_pass]);

  const user = async () => {
    try {
      setIsloading(true);
      setDisable(true);
      if (password !== confirm_pass) {
        setError_message("Passwords do not match");
        setIsloading(false);
        setDisable(true)
        return
      }
      const response = await UserSignUp(name, email.trim(), password.trim(), phone);
      if (response) {
        setIsloading(false);
        navigation.navigate("login");
        dispatch(Verification({token:response.data?.token}));
      }
    } catch (error) {
      console.log(error);
    }
    
  };

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
            <TouchableOpacity
              onPress={() => navigation.navigate("consultantregister")}
            >
              <Text className="ml-2 text-blue-600 font-bold">Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Full Name</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
          <Text className="m-1">Phone</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            phone={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <View className="flex flex-row items-center w-full  border border-gray-400 p-1 rounded">
            <TextInput
              placeholder="***********"
              className="flex-1"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={passhide}
            />
            <Pressable onPress={() => setPasshide(!passhide)}>
              {passhide ? (
                <Image
                  source={require("../assets/hide.png")}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  source={require("../assets/eyeopen.png")}
                  className="w-6 h-6"
                />
              )}
            </Pressable>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Confirm Password</Text>
          <View className="flex flex-row items-center w-full  border border-gray-400 p-1 rounded">
            <TextInput
              placeholder="***********"
              className="flex-1"
              value={confirm_pass}
              onChangeText={(text) => setConfirm_pass(text)}
              secureTextEntry={confirmhide}
            />
            <Pressable onPress={() => setConfirmhide(!confirmhide)}>
              {confirmhide ? (
                <Image
                  source={require("../assets/hide.png")}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  source={require("../assets/eyeopen.png")}
                  className="w-6 h-6"
                />
              )}
            </Pressable>
          </View>
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
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;


