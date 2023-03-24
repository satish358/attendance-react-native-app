import React from "react";
import { Button, Card, TextInput } from "react-native-paper";
import { View } from "react-native";
import Col from "../components/Col";
import Row from "../components/Row";
import { get } from "../services/api.service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServerSetupPage = ({ navigation }) => {
  const [serverIp, setServerIp] = React.useState("");
  const [serverPort, setServerPort] = React.useState("");
  const onSetup = async () => {
    if (serverIp && serverPort) {
      console.log(`http://${serverIp}:${serverPort}/api/auth/test`);
      try {
        const { data: res, status } = await axios.get(
          `http://${serverIp}:${serverPort}/api/auth/test`
        );
        if (status === 200) {
          AsyncStorage.setItem(
            "SERVER_BASE_URL",
            `http://${serverIp}:${serverPort}`
          );
          navigation.navigate("login");
        }
      } catch (error) {
        alert(error);
      }
    } else alert("Please fill details");
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
                  value={serverIp}
                  onChangeText={(text) => setServerIp(text)}
                  label="Server IP"
                  keyboardType="numeric"
                />
              </Col>
            </Row>
            <Row>
              <Col noHorizontalPadding>
                <TextInput
                  mode="outlined"
                  value={serverPort}
                  onChangeText={(text) => setServerPort(text)}
                  label="Server port"
                  keyboardType="numeric"
                />
              </Col>
            </Row>
          </View>
        </Card.Content>
        <Card.Actions style={{ paddingBottom: 12 }}>
          <Button icon={"server-network"} mode="outlined" onPress={onSetup}>
            Connect
          </Button>
        </Card.Actions>
      </Card>
    </Col>
  );
};

export default ServerSetupPage;
