import React from "react";
import {
  Button,
  Card,
  List,
  MD3Colors,
  Text,
  TextInput,
} from "react-native-paper";
import { ScrollView, View } from "react-native";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { getAuth } from "../../services/api.service";

const AttacheStudentToSubjectScreen = ({ route, navigation }) => {
  const subject = route.params;

  const [showAttendanceId, setShowAttendanceId] = React.useState<any>(null);

  const onStudentCardPress = (item: any) => {};
  const onStartPress = () => {
    getAuth(`/faculty/attendance/start/${subject?.id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Attendance started");
          setShowAttendanceId(res.data?.data?.qrUID);
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  const onStopPress = () => {
    setShowAttendanceId(null);
    getAuth(`/faculty/attendance/stop/${subject?.id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Attendance stopped");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  return (
    <ScrollView>
      <Col>
        {/* <Card mode="outlined">
          <Card.Content>
            <View>
              <Row>
                <Col noHorizontalPadding>
                  <TextInput
                    mode="outlined"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    label="Students Course"
                  />
                </Col>
              </Row>
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button icon="magnify" mode="outlined" onPress={onSearchPress}>
              Search Students
            </Button>
          </Card.Actions>
        </Card> */}

        <Card mode="outlined">
          <Card.Content>
            <Text variant="titleMedium">START / STOP Attendance</Text>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button
              icon="chevron-right-circle-outline"
              mode="outlined"
              onPress={onStartPress}
            >
              Start
            </Button>
            <Button
              icon="close-circle-outline"
              mode="outlined"
              onPress={onStopPress}
            >
              Stop
            </Button>
          </Card.Actions>
        </Card>

        {showAttendanceId && (
          <Card mode="outlined" style={{ marginVertical: 12 }}>
            <Card.Content>
              <Text variant="titleMedium">Attendance ID</Text>
              <Text
                style={{ color: "red", alignSelf: "center" }}
                variant="displayMedium"
              >
                {showAttendanceId}
              </Text>
            </Card.Content>
          </Card>
        )}

        <View style={{ marginTop: 6 }}>
          {subject?.students?.map((item) => (
            <Card
              key={item.id}
              mode="outlined"
              style={{ marginVertical: 6 }}
              onPress={() => onStudentCardPress(item)}
            >
              <Card.Content>
                <List.Item
                  title={item?.user?.firstName + " " + item?.user?.lastName}
                  description={`PRN : ${item.prn}, email: ${item?.user?.email}`}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={MD3Colors.tertiary70}
                      icon="account"
                    />
                  )}
                />
              </Card.Content>
            </Card>
          ))}
        </View>

        {subject?.students?.length === 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text>No students enroll in this Subject</Text>
          </View>
        )}
      </Col>
    </ScrollView>
  );
};

export default AttacheStudentToSubjectScreen;
