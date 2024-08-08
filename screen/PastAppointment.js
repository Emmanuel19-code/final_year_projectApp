import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PastAppointmentSlot from "../components/PastAppointmentSlot";
import { AllGetRequest } from "../context/allgetRequest";

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
    const response = await getMyAppointments();
    if (response) {
      setData(response);
    } else {
      setErrorMessage(p_error_message || "Failed to fetch appointments");
    }
    setIsLoading(false);
  };

  const pastAppointments = data?.filter((item) => {
    const [appointmentDate, appointmentMonth] = item.appointmentDate.split("/");
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    return (
      (currentDay > parseInt(appointmentDate) ||
        currentMonth > parseInt(appointmentMonth)) &&
      item.status !== "canceled"
    );
  });

  return (
    <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
      {isLoading && (
        <View className="flex-1 justify-center mt-20 items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
      {!isLoading && errorMessage ? (
        <Text className="text-center mt-10 font-bold">{errorMessage}</Text>
      ) : null}
      {!isLoading &&
        !errorMessage &&
        data.length === 0 && ( 
          <Text className="text-center mt-10 font-bold">
            There are no past appointments.
          </Text>
        )}
      {!isLoading &&
        !errorMessage &&
        data.length > 0 && 
        pastAppointments.map((item) => (
          <PastAppointmentSlot
            key={item._id}
            appointmentId={item._id}
            date={item.appointmentDate}
            time={item.appointmentTime}
            status={item.status}
            appointmentType={item.appointmentType}
          />
        ))}
    </ScrollView>
  );
};

export default PastAppointment;
