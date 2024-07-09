import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from 'react-native-gesture-handler';
import { AllGetRequest } from '../context/allgetRequest';
import Chat from '../components/chat';

const SChat = () => {
  const insets = useSafeAreaInsets();
  const {InvolvedConversations,p_error_message} = useContext(AllGetRequest)
  const [data,setData] = useState([])
  useEffect(()=>{
     fetch()
  },[])
  const fetch=async()=>{
    let data = await InvolvedConversations()
    setData(data)
  }
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text className=" text-black p-2 text-lg">Chats</Text>
      <ScrollView className="">
        {data &&
          data.map(
            (item, index) =>
              item && (
                <Chat
                  key={index}
                  conversationId={item.conversationId}
                  email={item.user.email}
                  healthworkerId={item.user.healthworkerId}
                  name={item.user.name}
                  phone={item.user.phone}
                />
              )
          )}
      </ScrollView>
    </View>
  );
}

export default SChat