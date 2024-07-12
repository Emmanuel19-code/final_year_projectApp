import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AllGetRequest } from "../context/allgetRequest";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";

const Chat = ({ conversationId, name, email, userIdentity, phone }) => {
  const navigation = useNavigation();
  const { GetMessagesInConversations } = useContext(AllGetRequest);
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const role = useSelector(selectRole)
  useEffect(() => {
    fetchMessages();
  }, [role]);

  const fetchMessages = async () => {
    try {
      let messages = await GetMessagesInConversations(conversationId);
      if (messages.length > data.length) {
        setNewMessage(true);
      }
      setData(messages);
    } catch (error) {
      console.log(error);
      
    }
  };
   
  const lastMessageContent =
    data && data.length > 0 ? data[data.length - 1].content : "No messages yet";


  return (
    <TouchableOpacity
      className="m-2 border-b p-2 border-gray-300"
      onPress={() => {
        setNewMessage(false);
        navigation.navigate("chatpage", {
          conversationId,
          name,
          email,
          userIdentity,
          phone,
        });
      }}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 items-center justify-center rounded-full bg-slate-200">
          <Image
            source={require("../assets/portrait-3d-female-doctor.jpg")}
            className="w-12 h-12 rounded-full"
          />
        </View>
        <View className={"m-1 flex-1"}>
          <View className="flex-row items-center">
            {/*
               <Text
              className={
                newMessage ? "font-bold text-md flex-1" : "flex-1 text-md"
              }
            >
              {name}
            </Text>
              
              */}
            <Text
              className={
                 "flex-1 text-md"
              }
            >
              {name}
            </Text>
            <Text className="text-xs">
              {data && data.length > 0
                ? new Date(data[data.length - 1].createdAt)
                    .toTimeString()
                    .substring(0, 5)
                : ""}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
              {lastMessageContent}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
