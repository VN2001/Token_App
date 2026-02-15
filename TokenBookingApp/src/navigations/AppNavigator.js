import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import LoginScreen from "../screens/LoginScreen";
import AdminLoginScreen from "../screens/Admin/AdminLoginScreen";
import AdminRegistration  from "../screens/Admin/AdminRegistrationScreen"
import RegisterScreen from "../screens/RegisterScreen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="UserLogin" component={LoginScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="AdminRegister" component={AdminRegistration}/>
      <Stack.Screen name="UserRegister" component={RegisterScreen}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;