import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

const MedicalSpecialist = () => {
  return (
    <View className="p-1 bg-gray-50 h-full">
      <ScrollView className="">
        <View className="m-3 bg-gray-200 shadow-lg p-2 rounded-lg flex flex-row items-center">
          <View className="">
            <Image
              source={require("../assets/nurse.png")}
              className="w-14 h-14"
            />
          </View>
          <View className="m-2">
            <Text className="text-[#007BFF] font-bold">
              General Practitioner
            </Text>
            <Text className="w-64 text-gray-500">
              Diagnosing and Treating Cancer
            </Text>
          </View>
        </View>
        <View className="m-3  bg-gray-200 shadow-lg p-2 rounded-lg flex flex-row items-center">
          <View className="">
            <Image
              source={require("../assets/nurse_white.png")}
              className="w-14 h-14"
            />
          </View>

          <View className="m-2">
            <Text className="text-[#007BFF] font-bold">Oncologist</Text>
            <Text className="w-64 text-gray-500">
              Diagnosing and Treating Cancer
            </Text>
          </View>
        </View>
        <View className="m-3  bg-gray-200 shadow-lg p-2 rounded-lg flex flex-row items-center">
          <View className="">
            <Image
              source={require("../assets/dentist.png")}
              className="w-14 h-14"
            />
          </View>

          <View className="m-2">
            <Text className="text-[#007BFF] font-bold">Dentist</Text>
            <Text className="w-64 text-gray-500">
              Treats teeth, gums, and mouth
            </Text>
          </View>
        </View>
        <View className="m-3  bg-gray-200 shadow-lg p-2 rounded-lg flex flex-row items-center">
          <View className="">
            <Image
              source={require("../assets/optometrist.png")}
              className="w-14 h-14"
            />
          </View>

          <View className="m-2">
            <Text className="text-[#007BFF] font-bold">Optometrist</Text>
            <Text className="w-64 text-gray-500">
              Provides comprehensive eye care and vision correction
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalSpecialist;
