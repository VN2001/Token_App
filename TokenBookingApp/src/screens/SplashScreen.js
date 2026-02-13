import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token Booking</Text>
      <Text style={styles.subtitle}>Avoid the Queue</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E86DE",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#fff",
  },
});
