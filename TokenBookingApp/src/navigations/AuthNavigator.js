import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import WelcomeScreen from "../screens/WelcomScreen";
import { StackScreen } from "react-native-screens";
import UserDashboard from "../screens/users/UserDashboard";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/" component={SplashScreen} />
         {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <StackScreen name="UserDashboard" component={UserDashboard} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
