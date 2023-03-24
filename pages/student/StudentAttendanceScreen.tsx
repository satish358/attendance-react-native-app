import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { Card, List, MD3Colors } from "react-native-paper";
import Col from "../../components/Col";
import { getAuth } from "../../services/api.service";

const StudentAttendanceScreen = ({ route, navigation }) => {
  const subject = route.params;
  const [attendanceList, setAttendanceList] = React.useState<any[]>([]);

  const getSubjectData = async () => {
    try {
      const { data: res } = await getAuth(
        `/student/attendance/getAllBySubject/${subject.id}`
      );
      setAttendanceList(res.data);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getSubjectData();
  }, []);
  return (
    <Col>
      <View>
        {attendanceList.map((item) => (
          <Card key={item.id} mode="outlined" style={{ marginVertical: 12 }}>
            <Card.Content>
              <List.Item
                title={item?.date}
                description={"Time " + item?.time}
                left={(props) => (
                  <List.Icon
                    {...props}
                    color={MD3Colors.tertiary70}
                    icon="clock-check"
                  />
                )}
              />
            </Card.Content>
          </Card>
        ))}
      </View>
    </Col>
  );
};

export default StudentAttendanceScreen;
