import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import TabsComponent from "../../components/TabsComponent";
import Row from "../../components/Row";
import Col from "../../components/Col";

export interface StudentDashboardScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const StudentDashboardScreen = ({
  navigation,
}: StudentDashboardScreenProps) => {
  const [userInfo, setUserInfo] = React.useState<any>(12);
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("USER_TOKEN");
      //  jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserInfo(jsonValue);
    } catch (e) {
      alert("Something went wrong with data localStorage");
    }
  };

  const navigateToScanner = () => {
    navigation.navigate("home");
  };

  return (
    // <View>
    //   <Row>
    //     <Col>
    //       <Card mode="outlined" onPress={navigateToScanner}>
    //         <Card.Content>
    //           <Text variant="titleLarge">Scan QR</Text>
    //         </Card.Content>
    //         <Card.Cover source={require("../../assets/wifi_img.png")} />
    //       </Card>
    //     </Col>
    //     <Col>
    //       <Card mode="outlined">
    //         <Card.Content>
    //           <Text variant="titleLarge">Card title</Text>
    //         </Card.Content>
    //         <Card.Cover source={require("../../assets/wifi_img.png")} />
    //       </Card>
    //     </Col>
    //   </Row>
    // </View>
    <TabsComponent />
  );
};

export default StudentDashboardScreen;
