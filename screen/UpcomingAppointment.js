import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UpcomingSlots from "../components/UpcomingSlots";
import { AllGetRequest } from "../context/allgetRequest";

const UpcomingAppointment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getMyAppointments, p_error_message } = useContext(AllGetRequest);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getMyAppointments();
      setData(response.filter((item) => item.status !== "canceled"));
    } catch (error) {
      p_error_message(error.message || "Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const upcoming = data?.filter((item) => {
    try {
      const appointmentDateParts = item.appointmentDate.split("/");
      const appointmentDate = new Date(
        parseInt(appointmentDateParts[1]), 
        parseInt(appointmentDateParts[0]) - 1, 
        parseInt(appointmentDateParts[2]) || new Date().getFullYear() 
      );
      const currentDate = new Date();
      return appointmentDate > currentDate;
    } catch (error) {
      console.error("Error parsing appointment date:", error);
      return false;
    }
  });

  return (
    <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <View className="flex-1 justify-center mt-20 items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : upcoming.length === 0 ? (
        <View className="w-96 justify-center flex flex-row h-72 items-center">
          <Text className="text-center mt-10 font-bold w-52">
            There are no current upcoming appointments.
          </Text>
        </View>
      ) : (
        upcoming.map((item) => (
          <UpcomingSlots
            key={item._id}
            appointmentId={item._id}
            date={item.appointmentDate}
            time={item.appointmentTime}
            status={item.status}
            appointmentType={item.appointmentType}
          />
        ))
      )}
    </ScrollView>
  );
};

export default UpcomingAppointment;
