import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { C, rs, vs, rf } from "../UserDashboard/Constants";

const icon2 = require("../../../assets/2.png");
const icon3 = require("../../../assets/3.png");
const icon4 = require("../../../assets/4.png");
const icon5 = require("../../../assets/5.png");
const icon6 = require("../../../assets/6.png");

const TABS = [
  { id: "home", icon: icon2 },
  { id: "list", icon: icon3 },
  { id: "search", icon: icon4 },
  { id: "bell", icon: icon5 },
  { id: "profile", icon: icon6 },
];

const BottomNavBar = ({ activeTab, onTabPress }) => (
  <View style={styles.bottomNav}>
    {TABS.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <TouchableOpacity
          key={tab.id}
          style={styles.navItem}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
            <Image
              source={tab.icon}
              style={[
                styles.navIcon,
                { tintColor: isActive ? C.purple : C.textDark },
              ]}
            />
          </View>
          {isActive && <View style={styles.navDot} />}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: C.white,
    paddingVertical: vs(10),
    paddingHorizontal: rs(8),
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -vs(4) },
    shadowOpacity: 0.08,
    shadowRadius: rs(12),
    paddingBottom: Platform.OS === "ios" ? vs(20) : vs(10),
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(4),
  },
  iconWrap: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(12),
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "#F0ECFF",
  },
  navIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: "contain",
  },
  navDot: {
    width: rs(5),
    height: rs(5),
    borderRadius: rs(3),
    backgroundColor: C.purple,
    marginTop: vs(3),
  },
});
export default BottomNavBar;