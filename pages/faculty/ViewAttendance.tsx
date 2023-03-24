import axios from "axios";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  Text,
  TextInput,
  Button,
  List,
  MD3Colors,
} from "react-native-paper";
import AlertComponent from "../../components/AlertComponent";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { getAuth, postAuth } from "../../services/api.service";

const ViewAttendance = () => {
  const [subjectList, setSubjectList] = React.useState<any[]>([]);

  const [formValues, setFormValues] = React.useState({
    subjectId: "",
    date: "",
  });
  //Alert States
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const onFieldChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSearchClick = async () => {
    try {
      const { status, data: res } = await postAuth(
        "/faculty/attendance/getAllBySubject",
        formValues
      );
      setFormValues({
        subjectId: "",
        date: "",
      });
      if (status === 200) {
        if (res?.data?.length == 0) {
          alert("No record found");
        } else {
          setSubjectList(res.data);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const isPresentColor = (status) => (status === "PRESENT" ? "green" : "red");
  const isPresent = (status) => status === "PRESENT";

  return (
    <ScrollView>
      <Col>
        <Card mode="outlined">
          <Card.Content>
            <View>
              <Row>
                <Col noHorizontalPadding>
                  <TextInput
                    mode="outlined"
                    value={formValues.subjectId}
                    onChangeText={(text) => onFieldChange("subjectId", text)}
                    label="Subject ID"
                  />
                </Col>
              </Row>

              <Row>
                <Col noHorizontalPadding>
                  <TextInput
                    mode="outlined"
                    value={formValues.date}
                    onChangeText={(text) => onFieldChange("date", text)}
                    label="Date"
                    placeholder="YYYY-MM-DD"
                  />
                </Col>
              </Row>
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button icon={"magnify"} mode="outlined" onPress={onSearchClick}>
              Search Attendance
            </Button>
          </Card.Actions>
        </Card>
        <AlertComponent
          onDismiss={hideDialog}
          message="Wrong Credential"
          visible={visible}
        />

        <View style={{ marginTop: 6 }}>
          {subjectList.map((item) => (
            <Card
              key={item.prn}
              mode="outlined"
              style={{
                marginVertical: 6,
              }}
            >
              <Card.Content
                style={{
                  borderLeftColor: isPresentColor(item.status),
                  borderLeftWidth: 10,
                  borderRadius: 15,
                }}
              >
                <List.Item
                  title={item?.studentName}
                  description={`Date : ${item.date}, PRN: ${item?.prn}`}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={MD3Colors.tertiary70}
                      icon="account"
                    />
                  )}
                  right={(props) => (
                    <List.Icon
                      {...props}
                      color={isPresentColor(item.status)}
                      icon={
                        isPresent(item.status)
                          ? "check-outline"
                          : "close-outline"
                      }
                    />
                  )}
                />
              </Card.Content>
            </Card>
          ))}
        </View>
      </Col>
    </ScrollView>
  );
};

export default ViewAttendance;
