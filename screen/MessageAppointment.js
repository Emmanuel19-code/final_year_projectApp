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
  const [refresh, setRefresh] = useState(false);
  const info = useSelector(selectInfo);

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const fetchAppointments = async () => {
    setM_isloading(true);
    try {
      let response = await GetMyReceivedAppointments();
      if (response && response.data) {
        const filteredData = response.data?.booked?.filter(
          (item) =>
            item.appointmentType === "message" &&
            item.doctorId === info.healthworkerId
        );
        setMdata(filteredData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setM_isloading(false);
      setRefresh(false)
    }
  };

  return (
    <View className="h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View className="items-center h-64 justify-center">
            <Text className="w-64 text-center">
              There are no Message appointments for you at the moment
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
