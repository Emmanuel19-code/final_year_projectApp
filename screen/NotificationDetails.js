import { View, Text, ScrollView} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";

const NotificationDetails = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { notificationId, message, data, title, backgroundColor, displayDate } =
    route.params;
  const info = useSelector(selectInfo);
  return (
    <View className="bg-white h-full">
      <ScrollView className="bg-white p-1" showsVerticalScrollIndicator={false}>
        <View className="p-2">
          <View className="flex flex-row  mb-5">
            <View
              className={`w-12 h-12 rounded-full justify-center`}
              style={{ backgroundColor: backgroundColor }}
            >
              <Text className="text-center text-lg text-white">
                {title.split(" ")[0][0]} {title.split(" ")[1][0]}
              </Text>
            </View>
            <View className="m-1 ">
              <View className="flex flex-row items-center">
                <Text className="m-1">{title}</Text>
                <Text className="m-1 text-xs text-gray-400">{displayDate}</Text>
              </View>
            </View>
          </View>
          {title == "Appointment Confirmation" && (
            <Text className=" text-base text-gray-500">{message}</Text>
          )}

          {title == "NEW PRESCRIPTION" && data && (
            <View>
              <Text className="text-base text-gray-500">{message}</Text>
              <Text className="text-base text-gray-500">
                Prescribed By {data?.doctorName}
              </Text>
              {data.medications.map((medication, key) => (
                <View key={key}>
                  <Text className="text-base text-gray-500">
                    Drug Name: {medication?.name}
                  </Text>
                  <Text className="text-base text-gray-500">
                    Dosage: {medication?.dosage}
                  </Text>
                  <Text className="text-base text-gray-500">
                    Instruction: {medication?.instructions}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetails;
