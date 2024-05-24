import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, {  useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


const Modalpop = ({pickedvalue,modalvalue,day,month}) => {
    const [modalVisible, setModalVisible] = useState(modalvalue);

  useEffect(() => {
    setModalVisible(modalvalue);
  }, [modalvalue]);

  return (
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
                    <Ionicons name="arrow-forward" size={24} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>
            <View className="bg-teal-100 p-2 flex-row items-center justify-around rounded-lg mt-5">
              <View className="flex-row items-center">
                <MaterialIcons name="date-range" size={24} color="#008080" />
                <Text className="ml-1 text-sm font-bold text-teal-700">
                  {day}
                </Text>
                <Text className="ml-1 text-sm font-bold text-teal-700">
                  {month}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="clock" size={24} color="#008080" />
                <Text className="ml-1 text-sm text-teal-700 font-bold">
                  {pickedvalue}
                </Text>
                <Text className="ml-1 text-sm text-teal-700 font-bold">
                  {pickedvalue <= 12 ? "AM" : "PM"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
export default Modalpop;
