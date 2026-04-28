import  { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { C, rs, vs } from "../../components/UserDashboard/Constants";
import DashboardHeader from "../../components/UserDashboard/DashboardHeader";
import TokenCarousel from "../../components/UserDashboard/TokenCarousel ";
import RecentlyAddedSection from "../../components/UserDashboard/RecentlyAddedSection ";
import SearchModal from "../../components/UserDashboard/SearchModal";
import BottomNavBar from "../../components/common/BottomNavbar";

const UserDashboard = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("home");
  const [seconds, setSeconds] = useState(89);
  const [bookingState, setBookingState] = useState("empty");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);

  // ✅ Restore state when returning from Payment
  useEffect(() => {
    if (route?.params?.bookingConfirmed && route?.params?.hospital) {
      setSelectedHospital(route.params.hospital);
      setBookingState("booked");
    }
  }, [route?.params?.bookingConfirmed]);

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
      setSearchVisible(true);
    } else if (tabId === "profile") {
      navigation.navigate("Profile");
    } else if (tabId === "bell") {
      navigation.navigate("Notifications");
    }else if (tabId === "list") {
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
  navigation={navigation}  // ← add this
/>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader />

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