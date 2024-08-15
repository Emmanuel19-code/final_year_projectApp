import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UpcomingSlots from "../components/UpcomingSlots";
import { AllGetRequest } from "../context/allgetRequest";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";

const MessageAppointment = ({ navigation }) => {
  const { GetMyReceivedAppointments } = useContext(AllGetRequest);
  const [mdata, setMdata] = useState([]);
  const [m_isloading, setM_isloading] = useState(false);
  const info = useSelector(selectInfo)
  const [refresh,setRefresh] = useState(false)
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setM_isloading(true);
    try {
      let response = await GetMyReceivedAppointments();
      if (response && response.data) {
        const filteredData = response.data?.booked?.filter(
          (item) => item.appointmentType === "message" && item.doctorId === info.uniqueId
        );
        setMdata(filteredData);
        setM_isloading(false);
      }
    } catch (error) {
      setM_isloading(false);
      console.log(error);
    }
  };
   
  return (
    <View className=" h-full">
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        {m_isloading ? (
          <View className="flex-1 justify-center mt-20 items-center">
            <ActivityIndicator size={"large"} color={"#3b82f6"} />
          </View>
        ) : mdata.length > 0 ? (
          mdata.map((item, key) => (
            <UpcomingSlots
              key={key}
              appointmentInformation={"Start Conversation"}
              icon_name={"message-circle"}
              type={"message"}
              navigation={navigation}
              id={item._id}
              date={item.appointmentDate}
              time={item.appointmentTime}
              patientId={item.patientId}
            />
          ))
        ) : (
          <View className="items-center bg-red-500">
            <Text className="w-64 text-center">
              There are no appointments for you at the moment
            </Text>
          </View>
        )}
      </ScrollView>
      {!m_isloading && (
        <View className="absolute right-4 bottom-3 bg-blue-500 rounded-full p-2">
          <TouchableOpacity onPress={() => setRefresh(true)}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MessageAppointment;
