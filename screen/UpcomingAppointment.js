import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UpcomingSlots from "../components/UpcomingSlots";
import { AllGetRequest } from "../context/allgetRequest";

const UpcomingAppointment = () => {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { getMyAppointments, p_error_message } = useContext(AllGetRequest);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await getMyAppointments();
      if (response && response.data) {
        const filteredData = response.data.booked.filter(
          (item) => item.status === "scheduled"
        );
        setData(filteredData);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
 
  return (
    <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
      {data &&
        data.map((item, index) => {
          return (
            <UpcomingSlots
              key={item._id}
              appoitmentId={item._id}
              date={item.appointmentDate}
              time={item.appointmentTime}
              status={item.status}
              appointmentType={item.appointmentType}
            />
          );
        })}
      {p_error_message ? (
        <Text className="text-center mt-10 font-bold">{p_error_message}</Text>
      ) : (
        <View className="flex-1 justify-center mt-20 items-center">
          <ActivityIndicator size={"large"} color={"#3b82f6"} />
        </View>
      )}
    </ScrollView>
  );
};

export default UpcomingAppointment;
