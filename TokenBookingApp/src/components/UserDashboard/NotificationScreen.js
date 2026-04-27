import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../common/BottomNavbar";
import { C, rs, vs, rf } from "./Constants";

const notifications = [
  {
    title: "Confirmation",
    subtitle: "Your token #A102 with Dr. Kumar is confirmed for 10:30 AM today.",
    time: "10 min",
    icon: "✅",
    color: "#4CC4A3",
  },
  {
    title: "Reminder!",
    subtitle: "Your token #C45 will be called soon. Please stay near the waiting area.",
    time: "2 min",
    icon: "🔔",
    color: "#FFB33A",
  },
  {
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "2 min",
    icon: "💳",
    color: "#3B82F6",
  },
  {
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "2 days",
    icon: "💳",
    color: "#3B82F6",
  },
  {
    title: "Payment details",
    subtitle: "Payment of ₹8500 completed successfully.",
    time: "3 days",
    icon: "💳",
    color: "#3B82F6",
  },
];

const NotificationCard = ({ item }) => (
  <View style={cardStyles.card}>
    <View style={[cardStyles.badge, { backgroundColor: item.color }]}> 
      <Text style={cardStyles.badgeText}>{item.icon}</Text>
    </View>
    <View style={cardStyles.content}>
      <View style={cardStyles.row}>
        <Text style={cardStyles.title}>{item.title}</Text>
        <Text style={cardStyles.time}>{item.time}</Text>
      </View>
      <Text style={cardStyles.subtitle}>{item.subtitle}</Text>
    </View>
  </View>
);

const NotificationScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    if (tabId === "home") {
      navigation.navigate("UserDashboard", { activeTab: "home" });
    } else if (tabId === "list") {
      navigation.navigate("UserDashboard", { activeTab: "list" });
    } else if (tabId === "search") {
      navigation.navigate("UserDashboard", { activeTab: "search" });
    } else if (tabId === "profile") {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subTitle}>Recent updates for your bookings</Text>
        {notifications.map((item, index) => (
          <NotificationCard item={item} key={index} />
        ))}
        <View style={{ height: vs(20) }} />
      </ScrollView>
      <BottomNavBar activeTab="bell" onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? vs(54) : vs(34),
    paddingBottom: vs(14),
    alignItems: "center",
    backgroundColor: "#F4F5FA",
  },
  headerTitle: {
    fontSize: rf(18),
    fontWeight: "700",
    color: C.textDark,
  },
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: vs(12),
  },
  subTitle: {
    fontSize: rf(13),
    color: "#7C7C8A",
    marginBottom: vs(14),
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: C.white,
    borderRadius: rs(20),
    padding: rs(16),
    marginBottom: vs(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.05,
    shadowRadius: rs(12),
    elevation: 4,
  },
  badge: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(14),
    alignItems: "center",
    justifyContent: "center",
    marginRight: rs(12),
  },
  badgeText: {
    fontSize: rf(20),
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: rf(15),
    fontWeight: "700",
    color: C.textDark,
    flex: 1,
  },
  time: {
    fontSize: rf(12),
    color: "#7C7C8A",
  },
  subtitle: {
    marginTop: vs(6),
    fontSize: rf(12),
    color: "#7C7C8A",
    lineHeight: rf(18),
  },
});

export default NotificationScreen;
