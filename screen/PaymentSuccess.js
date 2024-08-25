import { View, Text, TouchableOpacity , Image } from 'react-native'
import React, { useContext } from 'react'


const PaymentSuccess = ({navigation}) => {
  
  return (
    <View className="items-center bg-gray-100 h-screen p-1">
      <View className="mt-10 bg-white shadow p-2 h-56 rounded-lg items-center">
        <View className="w-36 h-36 ">
          <Image
            source={require("../assets/green_eco_loop_leaf_check_mark.jpg")}
            className="w-36 h-36"
          />
        </View>
        <Text className="text-center font-semibold text-gray-600">
          You appointment Has been booked Successfully
        </Text>
      </View>
      <View className="mt-10 items-center">
        <Text className="text-gray-600 font-semibold">
          Do You want to Book a Consultaion ?{" "}
        </Text>
        <TouchableOpacity
          className="bg-[#007BFF] p-2 mt-3 w-28 rounded-lg"
          onPress={() => navigation.navigate("appointments")}
        >
          <Text className="text-center text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentSuccess