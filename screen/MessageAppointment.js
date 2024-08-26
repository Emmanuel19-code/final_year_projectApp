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
import Toast from "react-native-toast-message";
import { AllPostRequest } from "../context/allpostRequest";
import moment from "moment";

const MessageAppointment = ({ navigation }) => {
  const { GetMyReceivedAppointments } = useContext(AllGetRequest);
  const [mdata, setMdata] = useState([]);
  const [m_isloading, setM_isloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const info = useSelector(selectInfo);
  const {
    ConsultantStartConversation,
    error_message,
    setError_message,
    successMessage,
    setSucessMessage,
  } = useContext(AllPostRequest);

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const isToday = (dateString) => {
    const today = moment().startOf("day");
    const appointmentDate = moment(dateString, "DD/MM/YYYY").startOf("day");
    return today.isSame(appointmentDate);
  };

  const fetchAppointments = async () => {
    setM_isloading(true);
    try {
      let response = await GetMyReceivedAppointments();
      if (response && response.data) {
        const filteredData = response.data?.booked?.filter(
          (item) =>
           item.appointmentType === "message" && item.doctorId === info.healthworkerId && item?.status == "scheduled" &&
            isToday(item?.appointmentDate) 
        )
        
        
        setMdata(filteredData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setM_isloading(false);
      setRefresh(false);
    }
  };

  const CreateConversation = async (data) => {
    try {
      const response = await ConsultantStartConversation(data);
      console.log(response?.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (error_message) {
      showToast(error_message, "error");
      setError_message("");
    }
  }, [error_message, setError_message]);

  useEffect(() => {
    if (successMessage) {
      showToast(successMessage, "success");
      setSucessMessage("");
    }
  }, [successMessage, setSucessMessage]);

  const showToast = (message, type) => {
    Toast.show({
      type: type,
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  };

  return (
    <View className="h-full bg-gray-100">
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
              functionCall={CreateConversation}
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
