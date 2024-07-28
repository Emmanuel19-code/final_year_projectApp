import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { AllGetRequest } from "../context/allgetRequest";
import Chat from "../components/chat";
import { selectRole } from "../store/authSlice";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SChat = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    InvolvedConversations,
    p_error_message,
    ConsultantConversations,
    setP_error_message,
  } = useContext(AllGetRequest);
  const [data, setData] = useState([]);
  const role = useSelector(selectRole);

  useEffect(() => {
    fetchData();
  }, [role]);

  const fetchData = async () => {
    let data;

    if (role === "user") {
      data = await InvolvedConversations();
    } else {
      data = await ConsultantConversations();
    }
    setData(data);
  };
  console.log(data, p_error_message);
  //useEffect(() => {
  //  if (p_error_message) {
  //    const timer = setTimeout(() => {
  //      setP_error_message("");
  //    }, 10000);
  //    return () => clearTimeout(timer);
  //  }
  //}, [p_error_message, setP_error_message]);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text className="text-black p-2 text-lg">Chats</Text>
      <ScrollView className="">
        {data?.length > 0 ? (
          data.map(
            (item, index) =>
              item && (
                <Chat
                  key={index}
                  conversationId={item.conversationId}
                  email={item.user.email}
                  userIdentity={
                    role === "user"
                      ? item.user.healthworkerId
                      : item.user.uniqueId
                  }
                  name={item.user.name}
                  phone={item.user.phone}
                />
              )
          )
        ) : (
          <View className="w-full h-screen object-contain justify-center items-center  ">
            <Text className="m-2 text-lg">{`${p_error_message}`}</Text>
            <Image
              source={require("../assets/message.png")}
              className="w-32 h-32 "
            />
          </View>
        )}
        {role != "user" && (
          <TouchableOpacity
            onPress={()=>navigation.navigate("appointments")}
            className="absolute bg-blue-600 w-12 
          h-12 bottom-20 p-1 flex 
          justify-center items-center right-4 rounded-full"
          >
            <AntDesign name="adduser" size={24} color="white" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default SChat;
