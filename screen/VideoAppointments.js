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
import VideoNotify from "../components/VideoNotify";

const VideoAppointments = () => {
     const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="h-full bg-[#F3FAF7]"
    >
      <View className="flex-row items-center">
        <Pressable onPress={OpenDrawer}>
          <Entypo name="menu" size={32} color="#046C4E" />
        </Pressable>
        <Text className=" ml-3 text-[#046C4E] text-2xl font-bold">
          Notification
        </Text>
      </View>
      <ScrollView className="p-2 m-2" showsVerticalScrollIndicator={false}>
        <VideoNotify/>
      </ScrollView>
    </View>
  );
};

export default VideoAppointments;
