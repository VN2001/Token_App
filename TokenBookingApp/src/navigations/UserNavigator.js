import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDashboard from "../screens/users/UserDashboard";
import ProfileScreen from "../components/UserDashboard/ProfileScreen";
import NotificationScreen from "../components/UserDashboard/NotificationScreen";

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserDashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
