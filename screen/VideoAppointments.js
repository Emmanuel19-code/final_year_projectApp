import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UpcomingSlots from "../components/UpcomingSlots";
import { AllGetRequest } from "../context/allgetRequest";
import { Ionicons } from "@expo/vector-icons";

const VideoAppointments = ({ navigation }) => {
  const { GetMyReceivedAppointments } = useContext(AllGetRequest);
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const fetchAppointments = async () => {
    setIsloading(true);
    try {
      let response = await GetMyReceivedAppointments();
      if (response && response.data) {
        const filteredData = response.data?.booked?.filter(
          (item) =>
            item.appointmentType === "video" &&
            item.doctorId === info.healthworkerId
        );
        setData(filteredData);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <View className="h-full bg-white">
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        {isloading ? (
          <View className="flex-1 justify-center mt-20 items-center">
            <ActivityIndicator size={"large"} color={"#3b82f6"} />
          </View>
        ) : data.length > 0 ? (
          data.map((item, key) => (
            <UpcomingSlots
              key={key}
              appointmentInformation={"Start Meeting"}
              icon_name={"video"}
              type={"video"}
              navigation={navigation}
              id={item._id}
              date={item.appointmentDate}
              time={item.appointmentTime}
            />
          ))
        ) : (
          <View className="items-center h-64 justify-center">
            <Text className="w-64 text-center">
              There are no Video appointments for you at the moment
            </Text>
          </View>
        )}
      </ScrollView>
      {!isloading && (
        <View className="absolute right-8 bottom-8 bg-blue-500 rounded-full p-2">
          <TouchableOpacity
            onPress={()=>setRefresh(true)}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoAppointments;
