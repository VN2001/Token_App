import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { C, rs, vs, rf } from "./Constants";

const icon5 = require("../../../assets/5.png");
const icon7 = require("../../../assets/7.png");

const DashboardHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <View style={styles.clockIcon}>
  <Image 
    source={icon7} 
    style={{ width: rs(24), height: rs(24), tintColor: C.white }} 
  />
</View>
      <View>
        <Text style={styles.greeting}>
          Hello <Text style={styles.greetingName}>Karthik!</Text>
        </Text>
        <Text style={styles.subGreeting}>Complete Your Profile Now...</Text>
      </View>
    </View>
    <View style={styles.notifWrapper}>
      <TouchableOpacity style={styles.notifButton}>
        <Image source={icon5} style={{ width: rs(24), height: rs(24), tintColor: C.textDark }} />
      </TouchableOpacity>
      <View style={styles.notifBadge} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: rs(4),
    marginBottom: vs(18),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(10),
  },
  clockIcon: {
  width: rs(44),
  height: rs(44),
  borderRadius: rs(22),           // Half of width/height = perfect circle
  backgroundColor: C.purple,       // Purple circular background
  justifyContent: "center",       // Center content vertically
  alignItems: "center",           // Center content horizontally
},
  greeting: {
    fontSize: rf(17),
    fontWeight: "700",
    color: C.textDark,
    letterSpacing: 0.2,
  },
  greetingName: {
    color: C.purple,
    fontWeight: "700",
  },
  subGreeting: {
    fontSize: rf(10),
    color: C.textMuted || "#666",
    marginTop: vs(1),
    fontWeight: "400",
  },
  notifWrapper: {
    position: "relative",
  },
  notifButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(10),
    backgroundColor: C.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  notifBadge: {
    position: "absolute",
    top: rs(8),
    right: rs(8),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: "#FF3B30",
  },
});

export default DashboardHeader;