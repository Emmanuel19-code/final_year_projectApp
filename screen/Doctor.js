import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";


const Doctor = ({navigation}) => {
    const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-gray-50 h-screen flex flex-col"
    >
      <View className="flex-1">
        <View className="h-52 w-full ">
          <Image
            source={require("../assets/portrait-3d-female-doctor.jpg")}
            className="h-64 w-full"
          />
        </View>
        <View className="bg-white shadow flex flex-row items-center rounded-full w-auto justify-around p-2 mt-9 m-1">
          <View className="flex flex-row items-center">
            <View className="w-14 h-14 bg-teal-50 text-center rounded-full flex flex-col justify-center p-1 items-center">
              <AntDesign name="addusergroup" size={24} color="#065f46" />
            </View>
            <View className="ml-2">
              <Text className="font-bold text-teal-600 text-lg">950+</Text>
              <Text className="text-sm text-gray-400 font-medium">
                Patients
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text className="font-bold text-teal-600 text-lg">22 Years</Text>
              <Text className="text-sm text-gray-400 font-medium">
                Experience
              </Text>
            </View>
          </View>
        </View>
        <View className="p-2 flex-1">
          <View className="border-b-2 border-gray-200 border-dashed m-2 p-1">
            <Text className="text-lg">Dr Rita</Text>
            <Text className="">The Christ Hospital</Text>
            <View className="flex flex-row items-center mb-2">
              <Text className=""></Text>
              <Text className="">4.8</Text>
              <Text className="ml-2">(300 Reviews)</Text>
            </View>
          </View>
          <View className="mt-2 border-b-2 border-gray-200 border-dashed m-2 p-1">
            <Text className="">Working Time</Text>
            <View className="flex flex-row items-center mb-2">
              <Text className="">Fri - Sat</Text>
              <Text className="">10. 00 AM - 11.30 PM</Text>
            </View>
          </View>
          <View className="border-b-2 border-gray-200 border-dashed m-2 p-1">
            <Text>About Doctor</Text>
            <Text className="flex-wrap mb-2">
              Dr. Rita is a board-certified cardiologist with over 15
              years of experience. She specializes in advanced cardiac care,
              including non-invasive procedures and patient education. Dr. Smith
              is dedicated to providing personalized care and improving heart
              health through the latest medical advancements and compassionate
              support.
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row items-center bg-white p-2 justify-around">
        <TouchableOpacity className="w-14 h-14 bg-teal-50 text-center rounded-full flex flex-col justify-center p-1 items-center">
          <AntDesign name="hearto" size={24} color="#065f46" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-teal-700 w-44 p-1 rounded"
          onPress={() => navigation.navigate("appointment")}
        >
          <Text className="font-bold text-white text-lg text-center">
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Doctor