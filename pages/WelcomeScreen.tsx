import React from "react";
import { Text } from "react-native-paper";
import { Image, View } from "react-native";
import Row from "../components/Row";
import Col from "../components/Col";

const WelcomeScreen = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/welcome.png")}
        style={{
          width: "90%",
          aspectRatio: 1,
          height: undefined,
          marginTop: 50,
        }}
      />
      <Text variant="titleLarge">Welcome to attendance system </Text>
    </View>
  );
};

export default WelcomeScreen;
