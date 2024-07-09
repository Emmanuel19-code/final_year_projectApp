import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import DisplayDoc from "../components/DisplayDoc";
import { AllPostRequest } from "../context/allpostRequest";

const SearchDoctor = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const { SearchConsultant, error_message, setError_message } =
    useContext(AllPostRequest);

  const Search = async () => {
    if (search.trim() === "") {
      setData([]);
     return  
    }
    setIsloading(true);
    let response = await SearchConsultant(search.trim());
    if (response) {
      setIsloading(false)
      setData(response.msg);
    }
  };

  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      const timer = setTimeout(() => {
        setError_message("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error_message, setError_message]);

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
      <ScrollView className="h-full">
        <View className="h-12 justify-center">
          <View className="flex-row items-center">
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
            <TouchableOpacity onPress={Search}>
              <EvilIcons name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {search !== "" &&
          data.length > 0 &&
          data.map((item, index) => (
            <DisplayDoc
              key={index}
              name={item.name}
              speciality={item?.speciality}
            />
          ))}
        {isloading && (
          <View className="flex-1 justify-center mt-20 items-center">
            <ActivityIndicator size={"large"} color={"#3b82f6"} />
          </View>
        )}
        {error_message && (
          <Text className="text-center mt-10">{error_message}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchDoctor;
