import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext,  useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { DateTimeContext } from "../context/DateProvider";
import SelectAppointmentDate from "../components/SelectAppointmentDate";
import Modalpop from "../components/Modalpop";
import TimeSlots from "../components/TimeSlots";


const Main = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const handleItemSelect = (itemId) => {
    setSelectedItemId((prevSelectedItemId) =>
      prevSelectedItemId === itemId ? null : itemId
    );
  };
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [pickervalue, setPickervalue] = useState("");
  const [timeslots, setTimeslots] = useState(null);
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const { currentHour, futureDates, morningSlots, eveningSlots } =
    useContext(DateTimeContext);
  const handleTimeSlots = (itemId) => {
    setTimeslots((prev) => (prev === itemId ? null : itemId));
  };
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/*first part of the main page */}
      <View className="bg-[#059669] p-2 rounded-b-3xl h-48 justify-between">
        <View className="mb-4">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={OpenDrawer}>
              <Entypo name="menu" size={30} color="white" />
            </Pressable>
            <Text className="ml-1 text-white text-lg">Appointment</Text>
          </View>
        </View>
        <View className="m-1 flex-row items-center">
          <Image
            source={require("../assets/portrait-3d-female-doctor.jpg")}
            className="w-20 h-20 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-white font-bold text-xl">Dr Rita </Text>
            <Text className="text-white text-xl ">Heart Surgeon</Text>
          </View>
        </View>
      </View>
      {/*second part of the main page */}
      <View className="mt-10 p-2">
        <View>
          <Text className="text-orange-500 text-lg">Choose your slot</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="scroll-smooth"
          >
            {futureDates.map((items, key) => {
              return (
                <View>
                  <SelectAppointmentDate
                    key={key}
                    day={items.data.day}
                    daydate={items.data.date}
                    id={items.id}
                    selectedItemId={selectedItemId}
                    onItemSelect={handleItemSelect}
                    showModal={showModal}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className="p-2 mt-5 ">
          <Text className="text-lg text-orange-500 ">Morning</Text>
          {morningSlots.length > 0 ? (
            <Text className="font-bold text-lg ml-2 for this period at the moment">
              No time available for this period at the moment
            </Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {morningSlots.map((item, key) => {
                const hour = item.time.toString().padStart(2, "0");
                const formattedCurrentHour = currentHour
                  .toString()
                  .padStart(2, "0");
                return (
                  hour < formattedCurrentHour ||
                  (hour !== formattedCurrentHour && currentHour < 12 && (
                    <TimeSlots
                      key={key}
                      timeslots={timeslots}
                      onItemSelect={handleTimeSlots}
                      id={item.id}
                      time={item.time}
                    />
                  ))
                );
              })}
            </ScrollView>
          )}
        </View>
        {/*Modal pop up section */}
        <Modalpop
          pickedvalue={pickervalue}
          modalvalue={modalVisible}
          day={futureDates[0].data.day}
          month={futureDates[0].data.month}
        />
        <View className="p-2 mt-5 ">
          <Text className="text-lg text-orange-500">Evening</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eveningSlots.map((item, key) => {
              const hour = item.time.toString().padStart(2, "0");
              const formattedCurrentHour = currentHour
                .toString()
                .padStart(2, "0");
              return (
                hour < formattedCurrentHour ||
                (hour !== formattedCurrentHour && currentHour >= 12 && (
                  <TimeSlots
                    key={key}
                    timeslots={timeslots}
                    onItemSelect={handleTimeSlots}
                    id={item.id}
                    time={item.time}
                  />
                ))
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
});
export default Main;

/*
 

previous code
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {timeSlots.map((item, key) => {
              const hour = item.time.toString().padStart(2, "0"); // Ensure two-digit format
              const formattedCurrentHour = currentHour
                .toString()
                .padStart(2, "0");
              return hour >= 12 ? (
                <View>
                  <Text>No time available at this moment </Text>
                </View>
              ) : (
                hour < currentHour ||
                  (hour !== formattedCurrentHour && ( // Exclude the current hour
                    // and also since the startime is set to 8 it prevents the display of the time once it is passed
                    <TimeSlots
                      key={key}
                      timeslots={timeslots}
                      onItemSelect={handleTimeSlots}
                      id={item.id}
                      time={item.time}
                    />
                  ))
              );
            })}
          </ScrollView>


*/
