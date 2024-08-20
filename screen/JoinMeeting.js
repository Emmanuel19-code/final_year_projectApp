import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { io } from "socket.io-client";

let socket;
const JoinMeeting = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [meetingId,setMeetingId] = useState("")
  const [meetingPassword,setMeetingPassword] = useState("")
  useEffect(() => {
    socket = io("http://100.66.121.49:5000");
    socket.on("connection", () => console.log("connected"))
    socket.on("joinedMeeting",({name})=>{
       console.log(name)
    })
  }, []);
  const joinRoom = () => {
    socket.emit("joinRoom", {name:consultantName,roomId:meetingId});
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-white h-screen"
    >
      <View className="border p-2 border-gray-300">
        <TextInput
          placeholder="Enter your name"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="border p-2 border-gray-300">
        <TextInput
          placeholder="Enter meeting Id"
          value={meetingId}
          onChangeText={(text) => setMeetingId(text)}
        />
      </View>
      <View className="border p-2 border-gray-300">
        <TextInput
          placeholder="Enter meeting Passowrd"
          value={meetingPassword}
          onChangeText={(text) => setMeetingPassword(text)}
        />
      </View>
      <View className="justify-center items-center m-2">
        <TouchableOpacity
          className="bg-blue-600 w-64 p-2 rounded"
          onPress={()=>navigation.navigate("newmeeting")}
        >
          <Text className="text-center text-white">Join Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinMeeting;
