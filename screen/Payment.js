import React, { useContext, useRef, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllPostRequest } from "../context/allpostRequest";
import { useStripe } from "@stripe/stripe-react-native";

const Payment = () => {
  const insets = useSafeAreaInsets();
  //const paystackWebViewRef = useRef(null);
  const { CreatePaymentIntent } = useContext(AllPostRequest);
  const [amount, setAmount] = useState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const Intent = async () => {
    try {
      let data = {
        amount: amount,
      };
      const response = await CreatePaymentIntent(data);
      if (response) {
        const initResponse = await initPaymentSheet({
          merchantDisplayName: "MB TELEMEDICINE",
          paymentIntentClientSecret: response.paymentIntent,
        });
        if(initResponse.error){
          Alert.alert("error")
          return
        }
       const paymentresponse =  await presentPaymentSheet()
       console.log(paymentresponse);
      }
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TextInput
          placeholder="enter amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        onPress={Intent}
      >
        <Text style={{ color: "white" }}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

/*
<Paystack
        paystackKey="pk_test_6cbf6c96d9481f60b1fe9dad6e6e0614b4e3708e"
        billingEmail="emmanueladane52@gmail.com"
        amount={"25000.00"}
        onCancel={(e) => {
          // handle response here
          console.log("Transaction canceled:", e);
        }}
        onSuccess={(res) => {
          // handle response here
          console.log("Transaction successful:", res);
        }}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        onPress={() => {
          if (paystackWebViewRef.current) {
            paystackWebViewRef.current.startTransaction();
          }
        }}
      >
        <Text style={{ color: "white" }}>Pay Now</Text>
      </TouchableOpacity>


*/
