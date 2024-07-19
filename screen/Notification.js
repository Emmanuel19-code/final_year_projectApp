import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import Notifcation from "../components/Notifcation";
import { Swipeable } from "react-native-gesture-handler";
import RenderRightActions from "../components/RenderRightActions";

const Notification = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showdrop, setShowdrop] = useState(false);
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Pressable
      onPress={() => setShowdrop(false)}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-white h-full"
    >
      <View className="flex-row items-center justify-between  ">
        <Pressable onPress={() => navigation.goBack()} className="m-1">
          <Entypo name="chevron-small-left" size={24} color="black" />
        </Pressable>
        <Text className=" ml-3 text-lg font-medium">Notification</Text>
        <Pressable onPress={() => setShowdrop(true)} className="m-1">
          <Entypo name="dots-three-vertical" size={26} color="black" />
        </Pressable>
      </View>
      {showdrop && (
        <Pressable
          onPress={() => setShowdrop(false)}
          className="absolute top-11 right-5 bg-white border-gray-300 h-10  border p-1 w-38 rounded-lg justify-center"
        >
          <Text>Delete All Notifications</Text>
        </Pressable>
      )}
      <ScrollView className="p-1 m-2" showsVerticalScrollIndicator={false}>
        <Swipeable renderRightActions={RenderRightActions}>
          <Notifcation />
        </Swipeable>
        {/**
         *
         * <Notifcation />
         *
         */}
      </ScrollView>
    </Pressable>
  );
};

export default Notification;
