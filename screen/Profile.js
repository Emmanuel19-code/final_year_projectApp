import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Button,
  Modal,
  StyleSheet
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LoggedOut, selectInfo, selectRole } from "../store/authSlice";
import { AllPostRequest } from "../context/allpostRequest";
import { AllGetRequest } from "../context/allgetRequest";
import { deleteToken } from "../store/tokenSlice";


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
  const [refresh,setRefresh] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const { UserUpdateProfile, ConsultantUpdateProfile,error_response } =
    useContext(AllPostRequest);
  const { GetUserInfo,GetConsultantInfo } = useContext(AllGetRequest);
  const info = useSelector(selectInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchprofile();
  }, [role,refresh]);

  const sendPost = async () => {
    try {
      let response;
      if (role == "user") {
        const data = { phone: phone };
        response = await UserUpdateProfile(data);
      } else {
        const data = {
          phone: phone,
          startTime: startTime,
          endTime: endTime,
        };
        response = await ConsultantUpdateProfile(data);
      }
      if (response) {
        setRefresh(!refresh); 
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

  const LogOut = ()=>{
    dispatch(deleteToken())
    dispatch(LoggedOut())
    navigation.push("login")
  }

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
        <Pressable onPress={() => navigation.goBack()}>
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
              {role == "user" ? info?.uniqueId : data?.healthworkerId}
            </Text>
          </View>
        </View>
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">Name</Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">{info?.name}</Text>
          </View>
        </View>
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">Email</Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">{info?.email}</Text>
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
                  <Text className="text-gray-300 font-extrabold">
                    {data?.startTime}
                  </Text>
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
                  <Text className="text-gray-300 font-extrabold">
                    {data?.endTime}
                  </Text>
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
        {error_response && (
          <View className="flex flex-row justify-center mt-2 items-center">
            <View className="bg-red-500 m-2 w-32 p-2 rounded">
              <Text className="text-white font-bold text-center">
                {error_response}
              </Text>
            </View>
          </View>
        )}
        {/*
          
           <View className="flex flex-row justify-center mt-2 items-center">
          <View className="bg-green-700 m-2 w-32 p-2 rounded">
            <Text className="text-white font-bold text-center">An error Occured</Text>
          </View>
        </View>
          
          */}
        <View className="mt-2">
          <Pressable onPress={() => setModalVisible(true)} className="m-2">
            <Text className="text-lg text-red-600">Log Out</Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-black-50">
            <View className="flex  bg-white w-80 rounded-lg shadow p-2">
              <Text className="m-2 text-2xl font-bold">Log out</Text>
              <Text className=" text-gray-600  m-2">
                Logging out will remove all your info
              </Text>
              <View className="items-center flex-row ml-auto">
                <Pressable onPress={() => setModalVisible(!modalVisible)} className="m-2">
                  <Text className="text-lg">Cancel</Text>
                </Pressable>
                <Pressable className="m-2" onPress={LogOut}>
                   <Text className="text-lg">Log Out</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Profile;
