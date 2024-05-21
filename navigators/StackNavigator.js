import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from './drawerNavigation';
import Doctor from '../screen/Doctor';


const stack = createStackNavigator();



const StackNavigator = () => {
  return (
    <stack.Navigator>
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
    </stack.Navigator>
  );
}

export default StackNavigator