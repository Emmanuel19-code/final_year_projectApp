import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllPostRequest } from "../context/allpostRequest";
import { useStripe } from "@stripe/stripe-react-native";
import * as Progress from "react-native-progress";

const Preview = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { date, time, type, consultant, healthworkerId } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { CreatePaymentIntent, BookAppointment } = useContext(AllPostRequest);
  const [amount, setAmount] = useState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const Intent = async () => {
    try {
      setIsloading(true);
      setDisable(true);
      let data = {
        amount: 1000,
      };
      const response = await CreatePaymentIntent(data);
      if (response) {
        setIsloading(false);
        const initResponse = await initPaymentSheet({
          merchantDisplayName: "MB TELEMEDICINE",
          paymentIntentClientSecret: response.paymentIntent,
        });
        if (initResponse.error) {
          setDisable(false);
          setIsloading(false);
        }
        const paymentresponse = await presentPaymentSheet();
        if (paymentresponse.error) {
          setDisable(false)
          setIsloading(false)
        } else {
          await book();
          navigation.navigate("success");
        }
      }
    } catch (error) {
      setIsloading(false);
      setDisable(false);
      console.log(error.response);
    }
  };

  const book = async () => {
    let data = {
      appointment_date: date,
      appointment_time: time,
      appointment_type: type,
      consultant_id: healthworkerId,
    };
    try {
      const response = await BookAppointment(data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-white h-full"
    >
      <View className="p-2 flex-1 flex-col">
        <View className="-mt-7 p-3 border-gray-200 border-b ">
          <View className="flex flex-row items-center m-1 ">
            <Text className="flex-1 text-base text-gray-400">
              Appointment Date :
            </Text>
            <Text>{date != "Invalid date" ? date : ""}</Text>
          </View>
          <View className="flex flex-row items-center m-1 ">
            <Text className="flex-1 text-base text-gray-400">
              Appointment Time :
            </Text>
            <Text>{time}</Text>
          </View>
          <View className="flex flex-row items-center m-1 ">
            <Text className="flex-1 text-base text-gray-400">
              Appointment Type :
            </Text>
            <Text className="capitalize">{type}</Text>
          </View>
          <View className="flex flex-row items-center m-1 justify-between">
            <View className="w-36 flex flex-row items-center">
              <Text className="flex-1 text-base text-gray-400">Consultant</Text>
              <Text className="mr-2 text-gray-400">:</Text>
            </View>

            <Text className="text-base font-bold ">{consultant}</Text>
          </View>
          <View className="flex flex-row items-center m-1 justify-between">
            <View className="w-36 flex flex-row items-center">
              <Text className="flex-1 text-base text-gray-400">
                Total Charge
              </Text>
              <Text className="mr-2 text-gray-400">:</Text>
            </View>

            <Text className="text-base font-bold">Ghs 160</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className={
          disable
            ? "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center opacity-60"
            : "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center"
        }
        onPress={Intent}
        disabled={disable}
      >
        {isloading && (
          <View className="mr-4">
            <Progress.Circle size={20} indeterminate={true} color="white" />
          </View>
        )}
        <Text className="text-white font-bold text-center">
          Proceed Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preview;
