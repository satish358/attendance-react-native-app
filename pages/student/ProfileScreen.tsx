import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import Col from "../../components/Col";
import Row from "../../components/Row";
import InputText from "../../components/InputText";
import { getAuth } from "../../services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [inputList, setInputList] = React.useState<any[]>([]);

  const getProfile = async () => {
    try {
      const { data: res } = await getAuth(`/student/profile`);
      const details = res?.data;

      setInputList([
        {
          name: "firstName",
          label: "First Name",
          value: details?.user?.firstName,
        },
        {
          name: "lastName",
          label: "Last Name",
          value: details?.user?.lastName,
        },
        {
          name: "email",
          label: "Email",
          value: details?.user?.email,
        },
        {
          name: "college",
          label: "College Name",
          value: details?.college,
        },
        {
          name: "prn",
          label: "PRN",
          value: details?.prn,
        },
        {
          name: "course",
          label: "Course Name",
          value: details?.course,
        },
        {
          name: "age",
          label: "Age",
          value: details?.age?.toString(),
        },
      ]);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  const onLogout = () => {
    AsyncStorage.removeItem("USER_TOKEN");
    navigation.goBack();
  };
  return (
    <ScrollView>
      <Col>
        <Card mode="outlined">
          <Card.Content>
            <View>
              {inputList.map((item) => (
                <InputText
                  key={item.name}
                  name={item.name}
                  value={item?.value || ""}
                  readOnly
                  label={item.label}
                  setter={() => {}}
                />
              ))}
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button icon={"exit-run"} mode="outlined" onPress={onLogout}>
              Sign Out
            </Button>
          </Card.Actions>
        </Card>
      </Col>
    </ScrollView>
  );
};

export default ProfileScreen;
