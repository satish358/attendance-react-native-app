import React from "react";
import { Card, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import Col from "../components/Col";
import Row from "../components/Row";
import { Button } from "react-native-paper";
import { useState } from "react";
import { get, post } from "./../services/api.service";
import AlertComponent from "../components/AlertComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}
const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  //Alert States
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const onFieldChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = async () => {
    try {
      const { data: res } = await post(`/api/auth/login`, formValues);
      setFormValues({
        email: "",
        password: "",
      });
      await AsyncStorage.setItem("USER_DATA", JSON.stringify(res?.data?.user));
      await AsyncStorage.setItem(
        "USER_ID",
        JSON.stringify(res?.data?.user?.id)
      );
      await AsyncStorage.setItem("USER_TOKEN", res?.data?.token);
      if (res?.data?.user?.role === "FACULTY")
        navigation.navigate("facultyDashboard");
      else navigation.navigate("studentDashboard");
    } catch (error) {
      setVisible(true);
    }
  };
  const onRegisterClick = () => {
    navigation.navigate("register");
  };
  return (
    <Col>
      <Card mode="outlined">
        <Card.Content>
          <View>
            <Row>
              <Col noHorizontalPadding>
                <TextInput
                  mode="outlined"
                  value={formValues.email}
                  onChangeText={(text) => onFieldChange("email", text)}
                  label="Email address"
                  keyboardType="email-address"
                />
              </Col>
            </Row>
            <Row>
              <Col noHorizontalPadding>
                <TextInput
                  mode="outlined"
                  value={formValues.password}
                  onChangeText={(text) => onFieldChange("password", text)}
                  label="Password"
                  secureTextEntry
                />
              </Col>
            </Row>
          </View>
        </Card.Content>
        <Card.Actions style={{ paddingBottom: 24 }}>
          <Button mode="outlined" onPress={onRegisterClick}>
            Register
          </Button>
          <Button icon="login" mode="contained" onPress={onSubmit}>
            Login
          </Button>
        </Card.Actions>
      </Card>
      <AlertComponent
        onDismiss={hideDialog}
        message="Wrong Credential"
        visible={visible}
      />
    </Col>
  );
};

export default LoginScreen;
