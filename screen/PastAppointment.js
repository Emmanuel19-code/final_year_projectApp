import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PastAppointmentSlot from "../components/PastAppointmentSlot";
import { AllGetRequest } from "../context/allgetRequest";
import moment from "moment";

const PastAppointment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getMyAppointments, p_error_message } = useContext(AllGetRequest);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getMyAppointments();
      if (response) {
        setData(response.filter((item) => item.status !== "canceled"));
      } else {
        setErrorMessage(p_error_message || "Failed to fetch appointments");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const pastAppointments = data?.filter((item) => {
    try {
      const appointmentDate = moment(item.appointmentDate, "DD/MM/YYYY");
      const currentDate = moment().startOf("day");
      return appointmentDate.isBefore(currentDate);
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
      ) : errorMessage ? (
        <Text className="text-center mt-10 font-bold">{errorMessage}</Text>
      ) : pastAppointments.length === 0 ? (
        <Text className="text-center mt-10 font-bold">
          There are no past appointments.
        </Text>
      ) : (
        pastAppointments.map((item) => (
          <PastAppointmentSlot
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

export default PastAppointment;
