import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const IndividualSpecialist = ({ type, description, image, navigation }) => {
  return (
    <TouchableOpacity
      className="m-2 bg-gray-200 shadow-lg p-2 rounded-lg flex flex-row items-center"
      onPress={() => navigation.navigate("specialtymember",{specialty:type})}
    >
      <View>
        <Image source={image} className="w-14 h-14" />
      </View>

      <View className="m-2">
        <Text className="text-[#007BFF] font-bold">{type}</Text>
        <Text className="w-64 text-gray-500">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IndividualSpecialist;
