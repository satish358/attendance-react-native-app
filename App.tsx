import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ScreenStack from "./pages/ScreenStack";

export default function App() {
  return (
    <PaperProvider>
      <ScreenStack />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
