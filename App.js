import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import DateTimeProvider from "./context/DateProvider";
import AppointmentProvider from "./context/AppointmentProvider";
import AllPostProvider from "./context/allpostRequest";
import AllGetProvider from "./context/allgetRequest";
import store from "./store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <AllPostProvider>
        <AllGetProvider>
          <AppointmentProvider>
            <DateTimeProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <StackNavigator />
                </NavigationContainer>
              </SafeAreaProvider>
            </DateTimeProvider>
          </AppointmentProvider>
        </AllGetProvider>
      </AllPostProvider>
    </Provider>
  );
}
