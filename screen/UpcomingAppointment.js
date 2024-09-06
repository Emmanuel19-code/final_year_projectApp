import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import UpcomingSlots from "../components/UpcomingSlots";
import { AllGetRequest } from "../context/allgetRequest";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { PUSHER_KEY } from "@env";
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";
import Toast from "react-native-toast-message";

const UpcomingAppointment = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getMyAppointments, p_error_message } = useContext(AllGetRequest);
  const [refresh, setRefresh] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(null);
  const info = useSelector(selectInfo);

 
  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("meetingNotice");

    channel.bind(info?.uniqueId, (appointmentData) => {
      setMeetingStarted(appointmentData);
      showToast("Your Meeting has started");
    });

    return () => {
      pusher.unsubscribe("meetingNotice");
      pusher.disconnect();
    };
  }, [info?.uniqueId]);

 
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [refresh, meetingStarted])
  );

  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getMyAppointments();
      if (response) {
        setData(response.filter((item) => item.status !== "canceled"));
      }
    } catch (error) {
      showToast("Failed to fetch appointments", "error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (p_error_message) {
      setIsLoading(false);
      showToast(p_error_message, "error");
      //console.log(p_error_message);
    }
  }, [p_error_message]);

  const upcoming = data.filter((item) => {
    try {
      const appointmentDate = moment(item.appointmentDate, "DD/MM/YYYY");
      //console.log(item);
      
      const currentDate = moment();
      return appointmentDate.isSameOrAfter(currentDate, "day");
    } catch (error) {
      console.error("Error parsing appointment date:", error);
      return false;
    }
  });

 
  const showToast = (message, type = "success") => {
    Toast.show({
      type: type,
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
    });
  };

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
            id={item._id}
            setRefresh={setRefresh}
            callId={item.callId}
            navigation={navigation}
            
          />
        ))
      )}
    </ScrollView>
  );
};

export default UpcomingAppointment;
