import { View, Text,Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
 import { DrawerActions } from "@react-navigation/native";

const News = ({navigation}) => {
     const insets = useSafeAreaInsets();
     const OpenDrawer = () => {
       navigation.dispatch(DrawerActions.toggleDrawer());
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
      <View className=" h-full">
        <View className="mb-4 bg-green-500 h-12 justify-center">
          <View className="flex-row items-center ">
            <Pressable onPress={OpenDrawer}>
              <Entypo name="menu" size={30} color="white" />
            </Pressable>
            <Text className="ml-3 text-white text-lg">Home</Text>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="m-1"
          >
            <View className="w-80 h-36 border m-3">
              <Text>hello</Text>
            </View>
            <View className="w-80 h-36 border m-3">
              <Text>hello</Text>
            </View>
            <View className="w-80 h-36 border m-3">
              <Text>hello</Text>
            </View>
          </ScrollView>
        </View>
        <View className="m-3">
          <Text>hello</Text>
        </View>

        <View className=" ">
          <ScrollView showsVerticalScrollIndicator={false} className="mb-1">
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
            <View className="w-auto h-36 m-1 border rounded-lg">
              <Text>hello</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default News