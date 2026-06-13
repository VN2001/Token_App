import  { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";import AsyncStorage from "@react-native-async-storage/async-storage";import { useNavigation } from "@react-navigation/native";

import { C, rs, vs } from "../../components/UserDashboard/Constants";
import DashboardHeader from "../../components/UserDashboard/DashboardHeader";
import TokenCarousel from "../../components/UserDashboard/TokenCarousel ";
import RecentlyAddedSection from "../../components/UserDashboard/RecentlyAddedSection ";
import SearchModal from "../../components/UserDashboard/SearchModal";
import BottomNavBar from "../../components/common/BottomNavbar";

const LAST_BOOKING_KEY = "LastDoctorBooking";

const UserDashboard = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("home");
  const [seconds, setSeconds] = useState(89);
  const [bookingState, setBookingState] = useState("empty");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const loadLastBooking = async () => {
    try {
      const raw = await AsyncStorage.getItem(LAST_BOOKING_KEY);
      if (!raw) return;
      const lastBooking = JSON.parse(raw);
      if (!lastBooking) return;

      setSelectedHospital({
        name: lastBooking.hospital || "Last booking",
        shortAddress:
          lastBooking.date && lastBooking.time
            ? `${lastBooking.date} • ${lastBooking.time}`
            : "",
        avatar: lastBooking.avatar || "👨‍⚕️",
        token: lastBooking.count || "",
        total: lastBooking.amount || "",
        date: lastBooking.date,
        time: lastBooking.time,
        amount: lastBooking.amount,
      });
      setBookingState("booked");
    } catch (error) {
      console.warn("Failed to load last booking", error);
    }
  };

  const loadStoredUserName = async () => {
    try {
      const savedName = await AsyncStorage.getItem("CurrentUserName");
      if (savedName) setUserName(savedName);
    } catch (error) {
      console.warn("Failed to load saved user name", error);
    }
  };

  // ✅ Restore state when returning from Payment or on login/signup entry
  useEffect(() => {
    const params = route?.params;
    if (params?.bookingConfirmed && params?.hospital) {
      setSelectedHospital(params.hospital);
      setBookingState("booked");
      navigation.setParams({ bookingConfirmed: false, hospital: undefined });
    } else if (params?.source === "signup") {
      setBookingState("empty");
      setSelectedHospital(null);
      setUserName(params?.userName || "");
      navigation.setParams({ source: undefined, userName: undefined });
    } else if (params?.source === "login") {
      if (params?.userName) {
        setUserName(params.userName);
      } else {
        loadStoredUserName();
      }
      loadLastBooking();
      navigation.setParams({ source: undefined, userName: undefined });
    }
  }, [route?.params]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(
      () => setSeconds((sc) => (sc > 0 ? sc - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "search") {
      navigation.navigate("SearchDoctors");
    } else if (tabId === "profile") {
      navigation.navigate("Profile");
    } else if (tabId === "bell") {
      navigation.navigate("Notifications");
    } else if (tabId === "list") {
      navigation.navigate("AddedProfiles");
    }
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setBookingState("listed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

    <SearchModal
  visible={searchVisible}
  onClose={() => {
    setSearchVisible(false);
    setActiveTab("home");
  }}
  onSelect={handleHospitalSelect}
  navigation={navigation}  // ← pass it back
/>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader userName={userName} />

        <TokenCarousel seconds={seconds} />

        <RecentlyAddedSection
          bookingState={bookingState}
          setBookingState={setBookingState}
          hospital={selectedHospital}
          navigation={navigation}
          onAddNew={() => setSearchVisible(true)}
        />
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg, marginTop: vs(40) },
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: rs(18),
    paddingTop: vs(12),
    paddingBottom: vs(24),
  },
});

export default UserDashboard;