import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectInfo, selectRole } from "../store/authSlice";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { PUSHER_KEY } from "@env";
import Pusher from "pusher-js/react-native";
import { AllGetRequest } from "../context/allgetRequest";
import Toast from "react-native-toast-message";
import { io } from "socket.io-client";
import * as Notifications from "expo-notifications";
import moment from "moment";

let socket;
const MainHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const info = useSelector(selectInfo);
  const role = useSelector(selectRole);
  const [newdata, setNewdata] = useState([]);
  const [data, setData] = useState([]);
  const { GetAllAppointment } = useContext(AllGetRequest);
  const [dataCanceled, setDateCanceled] = useState([]);
  const [completedAppointment, setCompletedAppointment] = useState([]);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 10 },
    });
  }

  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    socket = io("http://100.66.121.49:5000");
    socket.on("connection", () => console.log("connected"));
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "eu",
    });
    const channel = pusher.subscribe("appointments");

    channel.bind(role != info?.healthworkerId, (appointmentData) => {
      setNewdata(appointmentData);
      showToast("New appointment received!");
    });

    channel.bind(role != info?.healthworkerId, (appointmentData) => {
      setDateCanceled(appointmentData);
      showToast("Appointment was canceled.");
    });
    channel.bind("completed-appointment", (appointmentData) => {
      setCompletedAppointment(appointmentData);
    });
    FetchAppointments();

    return () => {
      channel.unbind("new-appointment");
      pusher.unsubscribe("appointments");
      pusher.unsubscribe("canceled-appointment");
    };
  }, []);

  useEffect(() => {
    FetchAppointments();
  }, [newdata, dataCanceled, completedAppointment]);

  const FetchAppointments = async () => {
    try {
      const response = await GetAllAppointment();
      if (response && response?.data && response?.data?.all_appointments) {
        const filteredData = response?.data?.all_appointments.filter(
          (item) =>
            item?.doctorId === info?.healthworkerId &&
            isToday(item?.appointmentDate)
        );
        setData(filteredData); 
      }
    } catch (error) {
      showToast("Error fetching appointments", "error");
    }
  };
const isToday = (dateString) => {
  const today = moment().startOf("day");
  const appointmentDate = moment(dateString, "DD/MM/YYYY").startOf("day");
  return today.isSame(appointmentDate);
};
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
  const cancelledAppointments = data?.filter(
    (appointment) => appointment?.status === "canceled"
  );
  const notCanceledAppointments = data?.filter(
    (appointment) => appointment?.status !== "canceled"
  );
  const completedAppointments = data?.filter(
    (appointment) => appointment?.status == "completed"
  );
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-gray-100 h-full"
    >
      <View className="flex flex-row items-center p-2">
        <Pressable className="w-10 h-10" onPress={OpenDrawer}>
          <Image
            source={require("../assets/portrait-man-cartoon-style.jpg")}
            className="w-10 h-10 object-contain rounded-full"
          />
        </Pressable>
        <Text className="ml-2 font-bold">
          Welcome {info?.name && info?.name.split(" ")[0]}
        </Text>
      </View>

      <View className="p-2 mt-10">
        {role === "user" ? (
          <View>
            <ScrollView horizontal={true}>
              <View className="w-80 h-40 border border-gray-300 bg-[#007BFF] rounded-xl p-1 justify-center m-1 shadow-lg">
                <View>
                  <Text className="text-xl text-white">Consult Doctors</Text>
                  <Text className="text-wrap w-64 text-gray-300 font-medium">
                    Get expert advice from Specialist Doctors
                  </Text>
                </View>
                <Image
                  source={require("../assets/scientist-guy.jpg")}
                  className="w-24 h-36 absolute right-0 bottom-0"
                />
              </View>
            </ScrollView>
            <View className="mt-8">
              <Text className="m-2 font-bold text-xl">Medical Specialties</Text>
            </View>
            <View className="flex-row justify-center items-center flex-wrap mt-1">
              <View className="m-1">
                <Image
                  source={require("../assets/nurse.png")}
                  className="w-10 h-10"
                />
                <Text className="w-16">General Practitioner</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/nurse_white.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Oncologist</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/dentist.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Dentist</Text>
              </View>
              <View className="m-1">
                <Image
                  source={require("../assets/optometrist.png")}
                  className="w-10 h-10"
                />
                <Text className="mt-2">Optometrist</Text>
              </View>
              <View className="justify-center">
                <TouchableOpacity
                  className="ml-2"
                  onPress={()=>navigation.navigate("specialty")}
                >
                  <Entypo name="chevron-right" size={30} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between flex-wrap">
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">{data.length}</Text>
              </View>
              <Text className="mt-2 text-white">Appointments for Today</Text>
            </View>
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">
                  {notCanceledAppointments.length}
                </Text>
              </View>
              <Text className="mt-2 text-white">Pending Appointments</Text>
            </View>
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">
                  {completedAppointments.length}
                </Text>
              </View>
              <Text className="mt-2 text-white">Completed</Text>
            </View>
            <View className="bg-blue-500 w-40 h-24 rounded-lg p-2 m-1 shadow-lg">
              <View className="flex flex-row items-center">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-xl ml-2 text-white">
                  {cancelledAppointments.length}
                </Text>
              </View>
              <Text className="mt-2 text-white">Cancelled appointments</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MainHome;
