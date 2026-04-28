import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import WelcomeScreen from "../screens/WelcomScreen";
import UserDashboard from "../screens/users/UserDashboard";
import ProfileScreen from "../components/UserDashboard/ProfileScreen";
import NotificationScreen from "../components/UserDashboard/NotificationScreen";
import TokenSlotBooking from "../screens/users/TokenSlotBooking";
import PaymentScreen from "../screens/users/PaymentScreen";
import DoctorBookingScreen from "../screens/users/DoctorBookingScreen";
import AddedProfileScreen from "../screens/users/Addedprofilesscreen"

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="BookingSlot" component={TokenSlotBooking} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="DoctorBooking" component={DoctorBookingScreen} />
      <Stack.Screen name="AddedProfiles" component={AddedProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;