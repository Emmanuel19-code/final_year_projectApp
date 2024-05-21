import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { DateTimeContext } from "../context/DateProvider";
import SelectAppointmentDate from "../components/SelectAppointmentDate";

const Main = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const handleItemSelect = (itemId) => {
    setSelectedItemId((prevSelectedItemId) =>
      prevSelectedItemId === itemId ? null : itemId
    );
  };
  const [selectedItemId, setSelectedItemId] = useState(null);

  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const deliverydates = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  //const [selectedItemIds, setSelectedItemIds] = useState(null);
  //const handleItemSelects = (id) => {
  //  setSelectedItemId(id);
  //  setModalVisible(false);
  //  console.log(`Selected item id: ${id}`);
  //};

  const showModal = () => {
    setModalVisible(true);
  };
  const { getFutureDate } = useContext(DateTimeContext);
  const [futureDates, setFutureDates] = useState([]);
  useEffect(() => {
    const dates = [];
    for (let day = 0; day < 7; day++) {
      const futureDateData = getFutureDate(Number(day));
      dates.push({
        id: day,
        data: futureDateData,
      });
    }
    setFutureDates(dates);
  }, []);
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
            <Text className="ml-1 text-white text-lg">Home</Text>
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
              console.log(items);
              return (
                <SelectAppointmentDate
                  key={key}
                  day={items.data.day}
                  daydate={items.data.date}
                  id={items.id}
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="p-2 mt-5 ">
          <Text className="text-lg text-orange-500 ml-2">Morning</Text>
          <ScrollView
            className=""
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {deliverydates.map((items, key) => {
              return (
                <TouchableOpacity
                  key={items.id}
                  className="w-36 h-10 border m-2 rounded"
                  onPress={showModal}
                ></TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay} className="">
              <View className="flex  bg-white w-80 rounded-lg">
                <View className="p-2 ">
                  <View className="flex-row items-center justify-between m-1">
                    <Text className="font-bold text-lg text-teal-600">
                      Your Appointment
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Entypo name="squared-cross" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View className="m-1 flex-row items-center justify-between mt-3">
                    <Image
                      source={require("../assets/portrait-3d-female-doctor.jpg")}
                      className="w-20 h-20 rounded-full"
                    />
                    <View className="ml-2">
                      <Text className="text-lg font-bold text-teal-700">
                        Dr Emmanuella
                      </Text>
                      <Pressable className="bg-teal-600 p-2 rounded flex-row items-center mt-4">
                        <Text className="text-white font-bold text-lg mr-2">
                          Pay & Book
                        </Text>
                        <Ionicons
                          name="arrow-forward"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View className="bg-teal-100 p-2 flex-row items-center justify-around rounded-lg mt-5">
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="date-range"
                      size={24}
                      color="#008080"
                    />
                    <Text className="ml-1 text-sm font-bold text-teal-700">
                      Monday 29, March
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="clock" size={24} color="#008080" />
                    <Text className="ml-1 text-sm text-teal-700 font-bold">
                      10:00 10:30 AM
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View className="p-2 mt-5 ">
          <Text className="text-lg text-orange-500 ml-2">Evening</Text>
          <ScrollView
            className=""
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {deliverydates.map((items, key) => {
              return (
                <TouchableOpacity
                  key={items.id}
                  className="w-36 h-10 border m-2 rounded"
                  onPress={showModal}
                ></TouchableOpacity>
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
