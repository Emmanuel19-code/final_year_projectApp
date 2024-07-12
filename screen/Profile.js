import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { AllPostRequest } from "../context/allpostRequest";
import { AllGetRequest } from "../context/allgetRequest";


const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [edit, setEdit] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [phone, setPhone] = useState("");
  const role = useSelector(selectRole);
  const [data, setData] = useState([]);
  const { UserUpdateProfile, ConsultantUpdateProfile } =
    useContext(AllPostRequest);
  const { GetUserInfo,GetConsultantInfo } = useContext(AllGetRequest);
  useEffect(() => {
    fetchprofile();
  }, [role]);
  const sendPost = async () => {
    try {
      if (role == "user") {
        const data = {
          phone: phone,
        };
        const response = await UserUpdateProfile(data);
        console.log("this is",response);
      } else {
        const data = {
          phone: phone,
          startTime: startTime,
          endTime: endTime,
        };
        const response = await ConsultantUpdateProfile(data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchprofile = async () => {
    try {
      if (role == "user") {
        const response = await GetUserInfo();
        setData(response);
      } else {
        const response = await GetConsultantInfo();
        setData(response);
      }
    } catch (error) {
      console.log("this",error);
    }
  };
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex flex-row items-center justify-between p-1">
        <Pressable onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View>
          <Text>Profile</Text>
        </View>
        <View className="mr-4">
          <TouchableOpacity
            onPress={() => {
              if (edit) {
                sendPost();
                setEdit(false);
              } else {
                setEdit(true);
              }
            }}
          >
            {edit ? (
              <Ionicons name="checkmark" size={24} color="black" />
            ) : (
              <AntDesign name="edit" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2">
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">
            Your Unique Id
          </Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">
              {role == "user" ? data?.uniqueId : data?.healthworkerId}
            </Text>
          </View>
        </View>
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">Name</Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">{data?.name}</Text>
          </View>
        </View>
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">Email</Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">{data?.email}</Text>
          </View>
        </View>
        {edit ? (
          <View className="m-2">
            <Text className="text-xs text-gray-500 font-bold mb-1">
              Mobile Number
            </Text>
            <View className="bg-white rounded p-2">
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>
        ) : (
          <View className="m-2">
            <Text className="text-xs text-gray-500 font-bold mb-1">
              Mobile Number
            </Text>
            <View className="bg-white rounded p-3">
              <Text className="text-gray-300 font-extrabold">
                {data?.phone}
              </Text>
            </View>
          </View>
        )}
        {edit ? (
          <View className="m-2">
            <Text className="text-xs text-gray-500 font-bold mb-1">
              Address
            </Text>
            <View className="bg-white rounded p-2">
              <TextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
        ) : (
          <View className="m-2">
            <Text className="text-xs text-gray-500 font-bold mb-1">
              Address
            </Text>
            <View className="bg-white rounded p-3">
              <Text className="text-gray-300 font-extrabold">Oyarifa</Text>
            </View>
          </View>
        )}
        {role != "user" && (
          <View>
            {edit ? (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  Start Time
                </Text>
                <View className="bg-white rounded p-2">
                  <TextInput
                    value={startTime}
                    onChangeText={(text) => setStartTime(text)}
                  />
                </View>
              </View>
            ) : (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  Start Time
                </Text>
                <View className="bg-white rounded p-3">
                  <Text className="text-gray-300 font-extrabold">{data?.startTime}</Text>
                </View>
              </View>
            )}
            {edit ? (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  End Time
                </Text>
                <View className="bg-white rounded p-2">
                  <TextInput
                    value={endTime}
                    onChangeText={(text) => setEndTime(text)}
                  />
                </View>
              </View>
            ) : (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  End Time
                </Text>
                <View className="bg-white rounded p-3">
                  <Text className="text-gray-300 font-extrabold">{data?.endTime}</Text>
                </View>
              </View>
            )}
            {edit ? (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  Working Days
                </Text>
                <View className="bg-white rounded p-2">
                  <TextInput
                    value={workingDays}
                    onChangeText={(text) => setWorkingDays(text)}
                  />
                </View>
              </View>
            ) : (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  Working Days (eg. Monday,Tuesday .....)
                </Text>
                <View className="bg-white rounded p-3">
                  <Text className="text-gray-300 font-extrabold">
                    Monday,Tuesday,Wednesday
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;
