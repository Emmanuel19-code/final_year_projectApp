// Chat.js
import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AllGetRequest } from "../context/allgetRequest";
import { useSelector, useDispatch } from "react-redux";
import Pusher from "pusher-js/react-native";
import { PUSHER_KEY } from "@env";
import {
  incrementMessageCount,
  clearMessageCount,
  messageCount,
} from "../store/messageSlice";

const Chat = ({ conversationId, name, email, userIdentity, phone }) => {
  const navigation = useNavigation();
  const { GetMessagesInConversations } = useContext(AllGetRequest);
  const [data, setData] = useState([]);
  const newMessageCount = useSelector(messageCount || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, { cluster: "eu" });
    const channel = pusher.subscribe(conversationId);

    const handleNewMessage = (data) => {
      dispatch(incrementMessageCount({ conversationId }));
    };

    channel.bind("new-message", handleNewMessage);

    fetchMessages();

    return () => {
      channel.unbind("new-message", handleNewMessage);
      pusher.unsubscribe(conversationId);
    };
  }, [conversationId, dispatch]);

  const fetchMessages = async () => {
    try {
      const messages = await GetMessagesInConversations(conversationId);
      setData(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const lastMessageContent =
    data?.length > 0 ? data[data.length - 1].content : "No messages yet";
  const lastMessageTime =
    data?.length > 0
      ? new Date(data[data.length - 1].createdAt).toTimeString().substring(0, 5)
      : "";

  return (
    <TouchableOpacity
      className="m-2 border-b p-2 border-gray-300"
      onPress={() => {
        dispatch(clearMessageCount({ conversationId }));
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
        <View className="m-1 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-1 text-md">{name}</Text>
            <Text className="text-xs">{lastMessageTime}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
              {lastMessageContent}
            </Text>
            {newMessageCount > 0 && (
              <View>
                <Text className="text-blue-500 text-xs font-bold">
                  {newMessageCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
