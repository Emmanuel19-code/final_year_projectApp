import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectInfo, selectRole } from "../store/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { io } from "socket.io-client";

const MainHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const [socket, setSocket] = useState(null);
  const info = useSelector(selectInfo);
  const role = useSelector(selectRole);
  
 useEffect(() => {
   const newSocket = io("http://localhost:5000");
   setSocket(newSocket);
   newSocket.on("connection", () => {
     console.log("Connected to server");
     newSocket.emit("joined", "emmanuel");
   });
   newSocket.on("newppointment", (message) => {
     console.log("Received newppointment:", message);
   });
   return () => {
     newSocket.disconnect();
   };
 }, []);
  
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex flex-row items-center p-2">
        <Pressable className="w-10 h-10" onPress={OpenDrawer}>
          <Image
            source={require("../assets/portrait-man-cartoon-style.jpg")}
            className="w-10 h-10 object-contain rounded-full"
          />
        </Pressable>
        <Text className="ml-2 font-bold">
          Welcome {info?.name && info?.name.split(" ")[0]}
        </Text>
      </View>
      <View className="p-2 mt-10">
        {role == "user" ? (
          <View>
            <ScrollView horizontal={true}>
              <View className="w-80 h-40 border border-gray-300 bg-blue-500 rounded-xl p-1 justify-center m-1">
                <View>
                  <Text className="text-xl text-white">Consult Doctors</Text>
                  <Text className="text-wrap w-64 text-gray-300 font-medium">
                    Get expert advise from Specialist Doctors
                  </Text>
                </View>
                <Image
                  source={require("../assets/scientist-guy.jpg")}
                  className="w-24 h-36 absolute right-0 bottom-0"
                />
              </View>
            </ScrollView>
            <View className="mt-8">
              <Text className="m-1 font-bold text-xl ">
                Medical Specialties
              </Text>
            </View>
            <View className="flex-row w-80  flex-wrap mt-1 ">
              <View className="m-1">
                <Image
                  source={require("../assets/nurse.png")}
                  className="w-10 h-10"
                />
                <Text className="w-16">General Practioner</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/nurse_white.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Oncologist</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/dentist.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Dentist</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/optometrist.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Optometrist</Text>
              </View>
              <View className="justify-center">
                <TouchableOpacity className="ml-2">
                  <Entypo name="chevron-right" size={30} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between flex-wrap">
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">9</Text>
              </View>
              <Text className="mt-2 text-white">Appointments for Today</Text>
            </View>
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">9</Text>
              </View>
              <Text className="mt-2 text-white">Pending Appointments</Text>
            </View>
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">10</Text>
              </View>
              <Text className="mt-2 text-white">Cancelled appointments</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MainHome;
