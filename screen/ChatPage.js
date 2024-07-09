import { View, Text, ScrollView,  TextInput, TouchableOpacity,  } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllGetRequest } from "../context/allgetRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AllPostRequest } from "../context/allpostRequest";
import { io } from "socket.io-client";

const ChatPage = ({route,navigation}) => {
     const insets = useSafeAreaInsets();
     const { conversationId, name, email, healthworkerId, phone } = route.params;
    const {GetMessagesInConversations} = useContext(AllGetRequest)
    const { UserSendMessage } = useContext(AllPostRequest);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

     useEffect(() => {
       const newSocket = io("https://final-year-backend-35ph.onrender.com");
       console.log(newSocket)
       setSocket(newSocket);

       newSocket.emit("joinRoom", conversationId);

       return () => newSocket.close();
     }, [conversationId]);

     // Fetch initial messages on component mount
     useEffect(() => {
       fetchMessages();
     }, []);

     // Listen for new messages from the Socket.IO server
     useEffect(() => {
       if (socket) {
         socket.on("newMessage", (message) => {
           setData((prevMessages) => [...prevMessages, message]);
         });
       }
     }, [socket]);
     //fetching messages
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
       let response = await UserSendMessage(data);
       if (response) {
         socket.emit("sendMessage", data); // Emit the message to the specific room
         setMessage("");
       }
     } catch (error) {
       console.log(error);
     }
   };
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
        {data && data.map((item, index) => (
          <View
            className={item.sender == healthworkerId ? "" : "ml-auto"}
            key={item._id}
          >
            <View
              className={
                item.sender == healthworkerId
                  ? "bg-gray-300 w-4/5 flex-row m-1 p-3 rounded-md"
                  : "bg-blue-400 w-4/5 flex-row m-2 p-3 rounded-md"
              }
            >
              <View className="flex-1">
                <Text className="text-white">{item.content}</Text>
              </View>
              <View className="absolute bottom-0 right-1">
                <Text className="text-white text-xs">
                  {new Date(item.createdAt).toTimeString().substring(0, 5)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="p-2 bg-slate-300  flex-row items-center">
        <TextInput
          placeholder="Please enter a message"
          onChangeText={(text) => setMessage(text)}
          className="flex-1"
        />
        <TouchableOpacity onPress={sendMessage} disabled={message || message.trim() === " " ? false : true}>
          <View className={message?"":"opacity-70"}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPage;
