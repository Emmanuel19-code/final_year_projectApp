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

const stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="healthprofessionalauth"
        component={HealthCareAuth}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="home"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="doctor"
        component={Doctor}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="appointment"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="verifyemail"
        component={VerifyEmail}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="consultantregister"
        component={ConsultantRegister}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default StackNavigator;
