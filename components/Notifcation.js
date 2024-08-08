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
import moment from "moment";

const Notifcation = ({ title, message, status, id, data, displayDate }) => {
  const [dropdown, setDropdown] = useState(false);
  const randomColors = ["#D1C4E9", "#20B2AA", "#228B22", "#F5F5DC", "#FFFFE0"];
  const getRandomColor = () => {
    const randomColors = [
      "#D1C4E9",
      "#20B2AA",
      "#228B22",
      "#B0B0B0",
      "#001F3F",
    ];
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };
  const backgroundColor = getRandomColor();
  
  return (
    <TouchableOpacity className="w-full p-2 m-1 flex flex-row justify-between">
      <View
        style={{
          backgroundColor,
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-center text-white">AC</Text>
      </View>
      <View className="flex-1 ml-2">
        <View className="flex-row items-center">
          <Text
            className={`w-72  ${
              !status ? "font-bold" : ""
            } text-[#007BFF] flex-1`}
          >
            {title}
          </Text>
        </View>
        {!dropdown && (
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className={`text-gray-500  w-52`}
            >
              {message}
            </Text>
          </View>
        )}

        {dropdown && (
          <View>
            <Text>{message}</Text>
            {title == "Appointment Reminder" ||
              (title == "Appointment Confirmation" && data && (
                <View>
                  <Text>{data?.doctorName}</Text>
                  <Text>
                    {moment(data?.appointmentDate).format("MMMM D, YYYY")}
                  </Text>
                </View>
              ))}
            {title == "Prescribtion" && data && (
              <View>
                <Text className="">Prescribed By {data?.doctorName}</Text>
                {data.medications.map((medication, key) => (
                  <View key={key}>
                    <Text>Drug Name: {medication?.name}</Text>
                    <Text className="font-bold">
                      Dosage: {medication?.dosage}
                    </Text>
                    <Text>Instruction: {medication?.instructions}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
      <Text className="text-xs">{displayDate}</Text>
    </TouchableOpacity>
  );
};

export default Notifcation;
