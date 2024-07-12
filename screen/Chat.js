import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { AllGetRequest } from "../context/allgetRequest";
import Chat from "../components/chat";
import { selectRole } from "../store/authSlice";
import { useSelector } from "react-redux";

const SChat = () => {
  const insets = useSafeAreaInsets();
  const { InvolvedConversations, p_error_message, ConsultantConversations } =
    useContext(AllGetRequest);
  const [data, setData] = useState([]);
  const role = useSelector(selectRole);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data;
    if (role === "user") {
      data = await InvolvedConversations();
    } else {
      data = await ConsultantConversations();
    }
    setData(data);
  };

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
        {data &&
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
          )}
      </ScrollView>
    </View>
  );
};

export default SChat;
