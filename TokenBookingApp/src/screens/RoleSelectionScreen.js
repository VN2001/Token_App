import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <Image
        source={require("../../assets/logo-app.png")} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Token Booking App</Text>

      {/* User Button */}
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => navigation.navigate("UserLogin")}
      >
        <Text style={styles.buttonText}>Continue as User</Text>
      </TouchableOpacity>

      {/* Admin Button */}
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => navigation.navigate("AdminLogin")}
      >
        <Text style={styles.buttonText}>Continue as Admin</Text>
      </TouchableOpacity>

    </View>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  userButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  adminButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
