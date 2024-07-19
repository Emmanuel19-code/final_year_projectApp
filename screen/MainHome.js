import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";

const MainHome = ({navigation}) => {
  const insets = useSafeAreaInsets();
   const OpenDrawer = () => {
     navigation.dispatch(DrawerActions.toggleDrawer());
   };
   const info = useSelector(selectInfo)
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex flex-row items-center p-2">
        <Pressable className="w-10 h-10" onPress={OpenDrawer}>
          <Image
            source={require("../assets/portrait-man-cartoon-style.jpg")}
            className="w-10 h-10 object-contain rounded-full"
          />
        </Pressable>
        <Text className="ml-2 font-bold">Welcome {info.name.split(" ")[0]}</Text>
      </View>
    </View>
  );
};

export default MainHome;
