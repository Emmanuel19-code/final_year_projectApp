import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StartMeeting from "../components/StartMeeting";

const MeetingRoom = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [meeting_id, setMeeting_id] = useState("");
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
    <StartMeeting
      name={name}
      setName={setName}
      meeting_id={meeting_id}
      setMeeting_id={setMeeting_id}
    />
    </View>
  );
};

export default MeetingRoom;
