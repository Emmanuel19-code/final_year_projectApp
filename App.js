import { useState , useEffect } from "react";
import {  Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import DateTimeProvider from "./context/DateProvider";
import AllPostProvider from "./context/allpostRequest";
import AllGetProvider from "./context/allgetRequest";
import store from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  }, []);
  console.log(expoPushToken)
  //async function sendPushTokenToBackend(token) {
  //  try {
  //    await axios.post("https://your-backend-url.com/api/save-token", {
  //      token: token,
  //      userId: "user-id-here", // Include user identification if necessary
  //    });
  //    console.log("Push token sent to backend successfully");
  //  } catch (error) {
  //    console.error("Failed to send push token to backend:", error);
  //  }
  //}
   
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      try {
        const projectId =
          Constants.expoConfig?.extra?.eas?.projectId ??
          Constants.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log("Expo Push Token:", token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AllPostProvider>
          <AllGetProvider>
            <DateTimeProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
                    <StackNavigator />
                  </StripeProvider>
                </NavigationContainer>
                <Toast />
              </SafeAreaProvider>
            </DateTimeProvider>
          </AllGetProvider>
        </AllPostProvider>
      </PersistGate>
    </Provider>
  );
}
