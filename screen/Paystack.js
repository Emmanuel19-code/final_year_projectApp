import React, { useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { SafeAreaView, View } from "react-native";
import { PAYSTACK_KEY} from "@env";

const PaystackComponent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Paystack
          paystackKey={PAYSTACK_KEY}
          amount={"25000.00"}
          currency="ghs"
          billingEmail="emmanueladane52@gmail.com"
          activityIndicatorColor="green"
          onCancel={(e) => {
            console.log(e);
          }}
          onSuccess={(res) => {
            console.log(res);
          }}
          autoStart={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaystackComponent;
