import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./drawerNavigation";
import Doctor from "../screen/Doctor";
import Main from "../screen/Main";
import Login from "../screen/Login";
import Register from "../screen/Register";
import VerifyEmail from "../screen/VerifyEmail";
import HealthCareAuth from "../screen/HealthCareAuth";
import ConsultantRegister from "../screen/ConsultantRegister";
import { useSelector } from "react-redux";
import { selectloggedIn } from "../store/authSlice";
import ChatPage from "../screen/ChatPage";
import Payment from "../screen/Payment";
import MeetingRoom from "../screen/MeetingRoom";
import VideoScreen from "../screen/VideoScreen";
import MedicalSpecialist from "../screen/MedicalSpecialist";
import SpecialityMembers from "../screen/SpecialityMembers";
import Preview from "../screen/Preview";
import NotificationDetails from "../screen/NotificationDetails";
import { Entypo } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const isLogged = useSelector(selectloggedIn);

  return (
    <Stack.Navigator>
      {isLogged ? (
        <>
          <Stack.Screen
            name="home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="doctor"
            component={Doctor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="appointment"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="chatpage"
            component={ChatPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="confirmappointmnet"
            component={Payment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="previewappointment"
            component={Preview}
            options={{
              headerTitle:"Preview"
            }}
          />
          <Stack.Screen
            name="meeting"
            component={MeetingRoom}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="video"
            component={VideoScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="specialty"
            component={MedicalSpecialist}
            options={{
              title: "Our Specialist",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="specialtymember"
            component={SpecialityMembers}
            options={{
              title: "Available Doctors",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="notificationdetails"
            component={NotificationDetails}
            options={({ route }) => ({
              headerTitle: "",
              headerTitleAlign: "center",
              headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                  <Pressable style={{ margin: 4 }}>
                    <Entypo name="archive" size={20} color="gray" />
                  </Pressable>
                  <Pressable onPress={() => {}} style={{ margin: 4 }}>
                    <Entypo name="trash" size={20} color="gray" />
                  </Pressable>
                  <Pressable onPress={() => {}} style={{ margin: 4 }}>
                    <Entypo name="dots-three-vertical" size={20} color="gray" />
                  </Pressable>
                </View>
              ),
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="verifyemail"
            component={VerifyEmail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="consultantregister"
            component={ConsultantRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="healthprofessionalauth"
            component={HealthCareAuth}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
