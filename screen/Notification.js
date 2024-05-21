import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import DeliveryDate from "../components/SelectAppointmentDate";
import { DrawerActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Notifcation from "../components/Notifcation";

const Notification = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
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
      className="bg-[#F3FAF7] h-full"
    >
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={OpenDrawer}>
            <Entypo name="menu" size={32} color="#046C4E" />
          </Pressable>
          <Text className=" ml-3 text-[#046C4E] text-2xl font-bold">
            Notification
          </Text>
        </View>
      </View>
      <ScrollView className="p-2 m-2" showsVerticalScrollIndicator={false}>
        <Notifcation />
        <Notifcation />
      </ScrollView>
    </View>
  );
};

export default Notification;
