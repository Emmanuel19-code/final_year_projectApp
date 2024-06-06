import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import DateTimeProvider from "./context/DateProvider";
import AuthProvider from "./context/authapi";
import AppointmentProvider from "./context/AppointmentProvider";

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <DateTimeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </DateTimeProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
}
