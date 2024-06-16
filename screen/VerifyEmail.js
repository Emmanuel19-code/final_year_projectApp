import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';

const VerifyEmail = ({navigation}) => {
     const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="p-2">
        <View>
            
        </View>
        <View className="mt-10">
          <Text className="font-bold text-2xl">Verify your email</Text>
          <Text className="text-gray-400 font-bold">
            Enter 6-digit code sent to ********@gmail.com
          </Text>
        </View>
        <View className="flex flex-row items-center mt-5">
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
          <View className="m-1">
            <TextInput className=" w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500" />
          </View>
        </View>
        <Pressable className="rounded-lg bg-slate-200 p-3 mt-5" onPress={()=>navigation.navigate("home")}>
             <Text className="text-gray-400 text-center">Next</Text>
        </Pressable>
        <View className="flex flex-row items justify-center mt-5">
             <Text className="">Didn't get code? </Text>
             <Text className="font-bold border-b-2">Try again</Text>
        </View>
      </View>
    </View>
  );
}

export default VerifyEmail