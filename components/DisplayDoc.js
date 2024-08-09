import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const DisplayDoc = ({name,speciality,healthworkerId,phone,starTime,endTime,email}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      className="p-2 bg-white rounded-lg m-2 shadow-lg flex-row items-center "
      onPress={() =>
        navigation.navigate("doctor", {
          name,
          speciality,
          phone,
          email,
          healthworkerId,
          starTime,
          endTime,
        })
      }
    >
      <View className="w-12 h-12">
        <Image
          source={require("../assets/portrait-3d-female-doctor.jpg")}
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text className="font-bold text-lg text-[#007BFF]">{name}</Text>
        <Text className="text-sm text-gray-500">{speciality}</Text>
      </View>
      <View>
        <Icon name="chevron-right" size={20} color="#4A5568" />
      </View>
    </TouchableOpacity>
  );
};

export default DisplayDoc;
