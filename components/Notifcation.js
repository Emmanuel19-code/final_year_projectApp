import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Notifcation = () => {
    const [dropdown,setDropdown] = useState(false)
  return (
    <View className="w-full p-2 border-b border-gray-300 ">
      <View className="flex-row items-center">
        <Text className="w-72 text-md text-gray-600">
          Your new appointment 15th, Wednesday in the evening from 7:30 to 9:30
          please come in given time
        </Text>
        <Pressable onPress={() => setDropdown(!dropdown)}>
          {dropdown ? (
            <MaterialIcons name="expand-less" size={30} color="#03543F" />
          ) : (
            <MaterialIcons name="expand-more" size={30} color="#03543F" />
          )}
        </Pressable>
      </View>
      {dropdown && (
        <View className="mt-5">
          <Text className=" font-bold text-xl">Bring all:</Text>
          <View className="flex-row items-center m-1">
            <AntDesign name="checkcircle" size={24} color="#046C4E" />
            <Text className="ml-3">Prescribtions</Text>
          </View>
          <View className="flex-row items-center m-1">
            <AntDesign name="checkcircle" size={24} color="#046C4E" />
            <Text className="ml-3">Reports</Text>
          </View>
          <View className="flex-row items-center m-1">
            <AntDesign name="checkcircle" size={24} color="#046C4E" />
            <Text className="ml-3">Blood tests</Text>
          </View>
          <View className="flex-row items-center m-1">
            <AntDesign name="checkcircle" size={24} color="#046C4E" />
            <Text className="ml-3">X-ray</Text>
          </View>
          <View className="flex-row items-center m-1">
            <AntDesign name="checkcircle" size={24} color="#046C4E" />
            <Text className="ml-3">Blood MRIs</Text>
          </View>
          <View className="flex-row items-center m-1">
            <Text className="">IF you have any Question</Text>
            <Text className="ml-2 text-blue-700 font-bold">Contact Us</Text>
          </View>
          <View className="bg-white m-1 w-full h-24 rounded shadow mt-2 p-1">
            <Text className="text-xl ml-1 items-center text-orange-500">
              Reach 15 min early than appointment time
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Notifcation;
