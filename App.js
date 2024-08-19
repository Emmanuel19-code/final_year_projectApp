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

export default function App() {
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
                <Toast/>
              </SafeAreaProvider>
            </DateTimeProvider>
          </AllGetProvider>
        </AllPostProvider>
      </PersistGate>
    </Provider>
  );
}
