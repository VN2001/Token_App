import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigations/RootNavigator";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Set global default font for all Text components
  if (fontsLoaded && !fontError) {
    if (!Text.defaultProps) {
      Text.defaultProps = {};
    }
    Text.defaultProps.style = [
      Text.defaultProps.style,
      { fontFamily: "Poppins_400Regular" },
    ];
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </View>
  );
}