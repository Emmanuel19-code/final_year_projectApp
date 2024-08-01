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

const Notifcation = ({ title, message, status, id, data }) => {
  const [dropdown, setDropdown] = useState(false);
  
  return (
    <TouchableOpacity className="w-full p-2 border-b border-gray-300 ">
      <View className="flex-row items-center">
        <Text className="w-72 text-lg font-bold text-gray-600 flex-1">
          {title}
        </Text>

        <Pressable onPress={() => setDropdown(!dropdown)}>
          {dropdown ? (
            <MaterialIcons name="expand-less" size={30} color="#03543F" />
          ) : (
            <MaterialIcons name="expand-more" size={30} color="#03543F" />
          )}
        </Pressable>

        {!status && (
          <View>
            <View className="bg-blue-700 w-2 h-2 rounded-full"></View>
          </View>
        )}
      </View>
      {!dropdown && (
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail">
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
                <Text>{data.doctorName}</Text>
                <Text>
                  {moment(data.appointmentDate).format("MMMM D, YYYY")}
                </Text>
              </View>
            ))}
          {title == "Prescribtion" && data && (
            <View>
              <Text className="">Prescribed By {data.doctorName}</Text>
              {data.medications.map((medication, key) => (
                <View key={key}>
                  <Text>Drug Name: {medication.name}</Text>
                  <Text className="font-bold">Dosage: {medication.dosage}</Text>
                  <Text>Instruction: {medication.instructions}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Notifcation;
