import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllGetRequest } from "../context/allgetRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import moment from "moment";

const ChatPage = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { conversationId, name, email, userIdentity, phone } = route.params;
  const { GetMessagesInConversations } = useContext(AllGetRequest);
  const { UserSendMessage, ConsultantSendMessage } = useContext(AllPostRequest);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const role = useSelector(selectRole);

  useEffect(() => {
    const newSocket = io("https://final-year-backend-35ph.onrender.com");
    setSocket(newSocket);
    newSocket.emit("joinRoom", conversationId);
    return () => newSocket.close();
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setData((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const fetchMessages = async () => {
    let data = await GetMessagesInConversations(conversationId);
    setData(data);
  };

  const sendMessage = async () => {
    try {
      let data = {
        conversationId: conversationId,
        content: message,
      };
      if (role === "user") {
        let response = await UserSendMessage(data);
        if (response) {
          socket.emit("sendMessage", data);
          setMessage("");
        }
      } else {
        let response = await ConsultantSendMessage(data);
        if (response) {
          socket.emit("sendMessage", data);
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
 
   

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = moment(message.createdAt).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(data);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="h-full"
    >
      <View className="p-1">
        <Text>{name}</Text>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        {Object.keys(groupedMessages).map((date) => (
          <View key={date}>
            <Text className="text-center text-gray-500">
              {moment(date).format("MMMM Do YYYY")}
            </Text>
            {groupedMessages[date].map((item) => (
              <View
                className={item.sender === userIdentity ? "" : "ml-auto"}
                key={item._id}
              >
                <View
                  className={
                    item.sender === userIdentity
                      ? "bg-gray-300 w-4/5 flex-row m-1 p-3 rounded-md"
                      : "bg-blue-400 w-4/5 flex-row m-2 p-3 rounded-md"
                  }
                >
                  <View className="flex-1">
                    <Text
                      className={
                        item.sender === userIdentity
                          ? "text-black"
                          : "text-white"
                      }
                    >
                      {item.content}
                    </Text>
                  </View>
                  <View className="absolute bottom-0 right-1">
                    <Text
                      className={
                        item.sender === userIdentity
                          ? "text-black text-xs"
                          : "text-white text-xs"
                      }
                    >
                      {new Date(item.createdAt).toTimeString().substring(0, 5)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View className="p-2 bg-slate-300 flex-row items-center">
        <TextInput
          value={message}
          placeholder="Please enter a message"
          onChangeText={(text) => setMessage(text)}
          className="flex-1"
        />
        <TouchableOpacity onPress={sendMessage} disabled={!message.trim()}>
          <View className={message.trim() ? "" : "opacity-70"}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPage;
