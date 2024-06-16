import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import DisplayDoc from "../components/DisplayDoc";
import { HealthContext } from "../context/healthworker";

const SearchDoctor = ({ navigation }) => {
  // this is used to set the safeareaview
  const insets = useSafeAreaInsets();
  //this function is used to toggle the drawer menu
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const { getAllworkers, isLoading, setSearch, search } =
    useContext(HealthContext);
  useEffect(() => {
    getAllworkers();
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
      <ScrollView className=" h-full">
        <View className="  h-12 justify-center">
          <View className="flex-row items-center ">
            <Pressable onPress={OpenDrawer}>
              <Entypo name="menu" size={30} color="black" />
            </Pressable>
            <Text className="ml-3 text-gray-500 text-xl">Doctors</Text>
          </View>
        </View>
        <View className="p-1">
          <View className="bg-white shadow p-3 mt-3 rounded flex-row items-center">
            <TextInput
              placeholder="search doctor"
              value={search}
              onChangeText={(text) => setSearch(text)}
              className="flex-1"
            />
            <TouchableOpacity>
              <EvilIcons name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchDoctor;
