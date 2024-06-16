import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import DateTimeProvider from "./context/DateProvider";
import AuthProvider from "./context/authapi";
import AppointmentProvider from "./context/AppointmentProvider";
import HealthworkerProvider from "./context/healthworker";

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <DateTimeProvider>
          <HealthworkerProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </HealthworkerProvider>
        </DateTimeProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
}
