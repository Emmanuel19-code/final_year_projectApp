import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DateTimeContext } from "../context/DateProvider";
import SelectAppointmentDate from "../components/SelectAppointmentDate";
import TimeSlots from "../components/TimeSlots";
import moment from "moment";

const Main = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [timedslots, setTimedslots] = useState(null);
  const [appointmentType, setAppointmentType] = useState("");
  const { futureDates, pickedDay, setPickedDay, GenerateTimeSlots } =
    useContext(DateTimeContext);
  const [time_slot, setTime_slot] = useState([]);

  const { name } = route.params;

  const handleItemSelect = (itemId) => {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    setPickedDay((prev) => (prev === itemId ? null : itemId));
  };
  const handleTimeSlots = (itemId) => {
    setTimedslots((prev) => (prev === itemId ? null : itemId));
  };

  useEffect(() => {
    let date = moment(futureDates[pickedDay]?.data.date, "MM/DD/YYYY");
    setTime_slot(GenerateTimeSlots(date.format("YYYY-MM-DD")));
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className=" h-screen">
        <View className="bg-[#059669] p-2 rounded-b-3xl h-44 justify-between">
          <View className="mb-4">
            <View className="flex-row items-center justify-between">
              <Text className="ml-1 text-white text-lg">Book Appointment</Text>
            </View>
          </View>
          <View className="m-1 flex-row items-center">
            <Image
              source={require("../assets/portrait-3d-female-doctor.jpg")}
              className="w-14 h-14 rounded-full"
            />
            <View className="ml-2">
              <Text className="text-white font-bold">{name}</Text>
              <Text className="text-white ">Heart Surgeon</Text>
            </View>
          </View>
        </View>
        {/*second part of the main page */}
        <View className="mt-8 p-2">
          <View>
            <Text className="text-orange-500 text-lg">Choose your slot</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="scroll-smooth"
            >
              {futureDates.map((items, key) => {
                return (
                  <View key={key}>
                    <SelectAppointmentDate
                      key={key}
                      day={items.data.day}
                      daydate={items.data.date}
                      id={items.id}
                      selectedItemId={selectedItemId}
                      onItemSelect={handleItemSelect}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View className="p-2 mt-5 ">
            <Text className="text-lg text-orange-500 ">Morning</Text>
            {time_slot?.length < 0 ? (
              <Text className="font-bold text-lg ml-2 for this period at the moment">
                No time available for this period at the moment
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {time_slot.map((item, key) => {
                  let currentHour = item.time.split(":")[0];
                  //console.log(currentHour);
                  //console.log(new Date().getHours());
                  console.log("this is cool", item.time);
                  return (
                    <TimeSlots
                      key={key}
                      timeslots={timedslots}
                      onItemSelect={handleTimeSlots}
                      id={item.id}
                      time={item.time}
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>

          <View className="mt-5">
            <Text className="text-lg text-orange-500">Appointment Type</Text>
            <View className="flex flex-row items-center">
              <TouchableOpacity
                className={`m-1 p-2 rounded flex items-center flex-row ${
                  appointmentType === "Video" ? "bg-blue-500 " : "bg-gray-300"
                }`}
                onPress={() => setAppointmentType("Video")}
              >
                <View className="mr-2 ">
                  <Feather name="video" size={20} color="white" />
                </View>

                <Text className="text-white font-bold">Video Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`m-1 p-2 rounded flex items-center flex-row ${
                  appointmentType === "Voice" ? "bg-violet-800" : "bg-gray-300"
                }`}
                onPress={() => setAppointmentType("Voice")}
              >
                <View className="mr-2 ">
                  <Feather name="phone-call" size={20} color="white" />
                </View>
                <Text className="text-white font-bold">Voice Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`m-1 p-2 rounded flex items-center flex-row ${
                  appointmentType === "Message"
                    ? "bg-orange-600"
                    : "bg-gray-300"
                }`}
                onPress={() => setAppointmentType("Message")}
              >
                <View className="mr-2 ">
                  <Feather name="message-circle" size={20} color="white" />
                </View>
                <Text className="text-white font-bold">Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPressIn={() => navigation.navigate("previewappointment")}
            className={"mt-3 bg-blue-900 p-1 rounded"}
          >
            <Text className="m-2 text-white text-center">
              Confirm Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Main;
