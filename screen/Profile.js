import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LoggedOut, selectInfo, selectRole, SetUser } from "../store/authSlice";
import { AllPostRequest } from "../context/allpostRequest";
import { AllGetRequest } from "../context/allgetRequest";
import { deleteToken } from "../store/tokenSlice";
import SelectWorkingDays from "../components/SelectWorkingDays";
import Feather from "@expo/vector-icons/Feather";

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [edit, setEdit] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const role = useSelector(selectRole);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { UserUpdateProfile, ConsultantUpdateProfile, error_response } =
    useContext(AllPostRequest);
  const { GetUserInfo, GetConsultantInfo } = useContext(AllGetRequest);
  const info = useSelector(selectInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchprofile();
  }, [role, refresh]);  
  
  
  const sendPost = async () => {
    try {
      const daysOnly = workingDays.map((dayObj) => dayObj.day);
      let response;

      if (role === "user") {
        response = await UserUpdateProfile({ phone });
      } else {
        response = await ConsultantUpdateProfile({
          phone,
          startTime,
          endTime,
          workingDays: daysOnly,
        });
      }

      if (response) {
        dispatch(SetUser(response.data?.data));
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
      console.log("this", error);
    }
  };

  const LogOut = () => {
    dispatch(deleteToken());
    dispatch(LoggedOut());
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}
    >
      <View className="flex flex-row items-center justify-between p-1">
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View>
          <Text>Profile</Text>
        </View>
        <View className="mr-4 flex flex-row items-center">
          {edit && (
            <TouchableOpacity
              onPress={() => {
                if (edit) {
                  setEdit(false);
                }
              }}
              className="p-1 m-1"
            >
              {edit && <Feather name="x" size={24} color="black" />}
            </TouchableOpacity>
          )}

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
      <ScrollView className="">
        <View className="m-2">
          <Text className="text-xs text-gray-500 font-bold mb-1">
            Your Unique Id
          </Text>
          <View className="bg-white rounded p-3">
            <Text className="text-gray-300 font-extrabold">
              {role == "user" ? info?.uniqueId : info?.healthworkerId}
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
                {info?.phone}
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
                    {info?.startTime}
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
                    {info?.endTime}
                  </Text>
                </View>
              </View>
            )}
            {edit ? (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  About
                </Text>
                <View className="bg-white rounded p-2">
                  <TextInput
                    value={about}
                    onChangeText={(text) => setAbout(text)}
                  />
                </View>
              </View>
            ) : (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  About
                </Text>
                <View className="bg-white rounded p-3">
                  <Text className="text-gray-300 font-extrabold">
                    {info?.about}
                  </Text>
                </View>
              </View>
            )}
            {edit ? (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold ">
                  Working Days
                </Text>
                <SelectWorkingDays setWorkingDays={setWorkingDays} />
              </View>
            ) : (
              <View className="m-2">
                <Text className="text-xs text-gray-500 font-bold mb-1">
                  Working Days (eg. Monday,Tuesday .....)
                </Text>
                <View className="bg-white rounded p-3 flex flex-row items-center">
                  {info?.workingdays?.map((day, index) => (
                    <Text
                      className="text-gray-300 font-extrabold"
                      key={index}
                      e
                    >
                      {day}
                      {index < info.workingdays.length - 1 && ", "}
                    </Text>
                  ))}
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
        <View className="">
          <Pressable onPress={() => setModalVisible(true)} className="m-3">
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
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  className="m-2"
                >
                  <Text className="">Cancel</Text>
                </Pressable>
                <Pressable className="m-2" onPress={LogOut}>
                  <Text className="">Log Out</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Profile;
