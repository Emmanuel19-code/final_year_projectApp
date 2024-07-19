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
