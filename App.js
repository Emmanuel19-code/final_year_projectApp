import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import DateTimeProvider from "./context/DateProvider";
import AuthProvider from "./context/authapi";
import AppointmentProvider from "./context/AppointmentProvider";
import AllPostProvider from "./context/allpostRequest";
import AllGetProvider from "./context/allgetRequest";

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
