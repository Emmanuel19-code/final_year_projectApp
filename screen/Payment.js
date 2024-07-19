import React, { useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Payment = () => {
  const insets = useSafeAreaInsets();
  const paystackWebViewRef = useRef(null);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paystack
        paystackKey="your-public-key-here"
        billingEmail="paystackwebview@something.com"
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
          borderRadius: 5
        }}
        onPress={() => {
          if (paystackWebViewRef.current) {
            paystackWebViewRef.current.startTransaction();
          }
        }}
      >
        <Text style={{ color: "white" }}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
