import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Notifcation from "../components/Notifcation";
import { Swipeable } from "react-native-gesture-handler";
import RenderRightActions from "../components/RenderRightActions";
import { AllGetRequest } from "../context/allgetRequest";
import moment from "moment";
import Pusher from "pusher-js/react-native";
import { PUSHER_KEY } from "@env";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";
import {
  setNotificationFlag,
  clearNotificationFlag,
} from "../store/notificationSlice";
import { useDispatch } from "react-redux";
import * as SQLite from "expo-sqlite";

const Notification = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showDrop, setShowDrop] = useState(false);
  const [data, setData] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const { GetNotification } = useContext(AllGetRequest);
  const role = useSelector(selectInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    PusherConnection();
    FetchNotification();
    dispatch(clearNotificationFlag());
    
  }, []);

  useEffect(() => {
    if (newNotification) {
      FetchNotification();
      dispatch(setNotificationFlag());
    }
  }, [newNotification]);

  const PusherConnection = () => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "eu",
    });
    const channel = pusher.subscribe("global_notifications");
    const channel_two = pusher.subscribe(`${role.uniqueId}`);

    const handleNewNotification = (data) => {
      setNewNotification(data);
    };

    channel.bind("new-notification", handleNewNotification);
    channel_two.bind("new-notification", handleNewNotification);

    return () => {
      channel.unbind("new-notification", handleNewNotification);
      channel_two.unbind("new-notification", handleNewNotification);
    };
  };

  const FetchNotification = async () => {
    try {
      const response = await GetNotification();
      if (response) {
        setData(response.data?.all_notice);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.response);
    }
  };

  const groupNotificationByDate = (notifications) => {
    if (notifications) {
      return notifications.reduce((groups, notification) => {
        const date = moment(notification.createdAt).format("YYYY-MM-DD");
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
      }, {});
    }
    return {};
  };

  const groupedNotification = groupNotificationByDate(data);

  const sortedDates = Object.keys(groupedNotification).sort((a, b) => {
    if (moment(a).isSame(moment(), "day")) return -1;
    if (moment(b).isSame(moment(), "day")) return 1;
    return moment(b).diff(moment(a));
  });
  
  return (
    <Pressable
      onPress={() => setShowDrop(false)}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-white h-full"
    >
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => navigation.goBack()} className="m-1">
          <Entypo name="chevron-small-left" size={24} color="black" />
        </Pressable>
        <Text className="ml-3 text-lg font-medium">Notification</Text>
        <Pressable onPress={() => setShowDrop(true)} className="m-1">
          <Entypo name="dots-three-vertical" size={26} color="black" />
        </Pressable>
      </View>
      {showDrop && (
        <Pressable
          onPress={() => setShowDrop(false)}
          className="absolute top-11 right-5 bg-white border-gray-300 h-10 border p-1 w-38 rounded-lg justify-center"
        >
          <Text>Delete All Notifications</Text>
        </Pressable>
      )}
      <ScrollView className="p-1 m-2" showsVerticalScrollIndicator={false}>
        {groupedNotification && sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const today = moment().format("MMMM D, YYYY");
            const yesterday = moment()
              .subtract(1, "days")
              .format("MMMM D, YYYY");
            let displayDate = moment(date).format("MMMM D, YYYY");

            if (displayDate === today) {
              displayDate = "Today";
            } else if (displayDate === yesterday) {
              displayDate = "Yesterday";
            }

            return (
              <View key={date}>
                <View className="justify-center flex flex-row m-1">
                  <Text className="text-center text-gray-500 text-xs w-24 rounded">
                    {displayDate}
                  </Text>
                </View>
                {groupedNotification[date].map((item) => (
                  <Swipeable
                    key={item._id}
                    renderRightActions={RenderRightActions}
                  >
                    <Notifcation
                      title={item.title}
                      message={item.message}
                      status={item.read}
                      id={item._id}
                      data={item.data && item.data}
                      displayTime={new Date(item.createdAt)
                        .toTimeString()
                        .substring(0, 5)}
                      displayDate={displayDate}
                    />
                  </Swipeable>
                ))}
              </View>
            );
          })
        ) : (
          <View className="justify-center items-center h-96 mt-24">
            <Image
              source={require("../assets/alarm-bell.png")}
              className="w-24 h-24"
            />
            <Text className="font-bold text-lg m-2 text-gray-500">
              No notifications available
            </Text>
          </View>
        )}
      </ScrollView>
    </Pressable>
  );
};

export default Notification;
