import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigators/StackNavigator';
import DateTimeProvider from './context/DateProvider';



export default function App() {
  return (
    <DateTimeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </DateTimeProvider>
  );
}
