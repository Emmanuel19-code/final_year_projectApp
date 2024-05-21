import { View, Text, ActivityIndicator,TouchableOpacity,TextInput,Pressable, ScrollView,Image } from "react-native";
import React, { useState } from 'react'
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
 import { DrawerActions } from "@react-navigation/native";
 import { Entypo } from "@expo/vector-icons";
import DisplayDoc from "../components/DisplayDoc";

const SearchDoctor = () => {
    // this is used to set the safeareaview
    const insets = useSafeAreaInsets();
     const [isloading, setIsloading] = useState(false);
     const [search, setSearch] = useState("");
     const [searchResult,setSearchResult] = useState()
     //this function is used to toggle the drawer menu
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
    >
      <ScrollView className=" h-full">
        <View className=" bg-blue-200 h-12 justify-center">
          <View className="flex-row items-center ">
            <Pressable onPress={OpenDrawer}>
              <Entypo name="menu" size={30} color="white" />
            </Pressable>
            <Text className="ml-3 text-white text-lg">Doctors</Text>
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
        {isloading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchDoctor