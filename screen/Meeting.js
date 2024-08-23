import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";


const apiKey = "a6q6ssgnfqc9";
const userId = "HW1234568";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSFcxMjM0NTY4In0.EvPClVDFIdTwvmDP5VTlJAA9rjXu59WgqMMCaFWQRZU";
const callId = "";
const user = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });
const Meeting = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mute, setMute] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const insets = useSafeAreaInsets();
 const info = useSelector(selectInfo)
 //console.log(info);
 
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        alert("We need your permission to show the camera");
      }
    };

    requestPermissions();
  }, [requestPermission]);

   function toggleCameraFacing() {
     setFacing((current) => (current === "back" ? "front" : "back"));
   }

   if (!permission) {
     return <View />;
   }

   if (!permission.granted) {
     return (
       <View>
         <Text >
           We need your permission to show the camera
         </Text>
         <Button onPress={requestPermission} title="Grant Permission" />
       </View>
     );
   }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
         <CallContent/>
      </StreamCall>
    </StreamVideo>
  );
};

export default Meeting;
/*

 <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {showVideo ? (
        <CameraView className="flex-1" facing={facing}>
          <View className="absolute right-2 top-2 p-2 border border-gray-300 w-32 h-48 bg-red-500">
            <Text className="text-white">Hello</Text>
          </View>
          <View className="flex-1" />
          <View className="flex flex-row items-center justify-center p-2 bg-blue-600">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() => setMute(!mute)}
                className="flex items-center mx-4"
              >
                {mute ? (
                  <Feather name="mic-off" size={24} color="black" />
                ) : (
                  <Feather name="mic" size={24} color="black" />
                )}
                <Text className="text-white mt-2">
                  {!mute ? "Mute" : "Unmute"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowVideo(!showVideo)}
                className="flex items-center mx-4"
              >
                {showVideo ? (
                  <Feather name="video" size={24} color="black" />
                ) : (
                  <Feather name="video-off" size={24} color="black" />
                )}
                <Text className="text-white mt-2">
                  {showVideo ? "Video" : "No Video"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="flex items-center mx-4"
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={24}
                  color="black"
                />
                <Text className="text-white mt-2">{facing}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      ) : (
        <View className="flex-1 bg-gray-300">
          <View className="flex-1 justify-center items-center">
            <View className="absolute right-2 top-2 p-2 border border-gray-300 w-32 h-48 bg-red-500">
              <Text className="text-white">Hello</Text>
            </View>
            <Image
              source={require("../assets/faceless.jpeg")} // Placeholder image URL
              className="w-36 h-36 rounded-full mb-4"
            />
          </View>
          <View className="flex flex-row items-center justify-center p-2 bg-blue-600 mt-4">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() => setMute(!mute)}
                className="flex items-center mx-4"
              >
                {mute ? (
                  <Feather name="mic-off" size={24} color="black" />
                ) : (
                  <Feather name="mic" size={24} color="black" />
                )}
                <Text className="text-white mt-2">
                  {!mute ? "Mute" : "Unmute"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowVideo(!showVideo)}
                className="flex items-center mx-4"
              >
                {showVideo ? (
                  <Feather name="video" size={24} color="black" />
                ) : (
                  <Feather name="video-off" size={24} color="black" />
                )}
                <Text className="text-white mt-2">
                  {showVideo ? "Video" : "No Video"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="flex items-center mx-4"
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={24}
                  color="black"
                />
                <Text className="text-white mt-2">{facing}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>




*/