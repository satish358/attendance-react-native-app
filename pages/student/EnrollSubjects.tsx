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
import { getAuth } from "../../services/api.service";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { useNavigation } from "@react-navigation/native";

const EnrollSubjects = () => {
  const navigation = useNavigation<any>();

  const [subjectList, setSubjectList] = React.useState<any[]>([]);
  const [subjectId, setSubjectId] = React.useState("");

  const getSubjectData = async () => {
    try {
      const { data: res } = await getAuth(`/student/subjects`);
      setSubjectList(res.data);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getSubjectData();
  }, []);

  const onAttendancePress = () => {
    // navigation.navigate("studentAttendance");
  };

  const onAddSubject = async () => {
    if (subjectId) {
      try {
        const { data: res, status } = await getAuth(
          `/student/enroll/${subjectId}`
        );
        if (status === 200) alert("Subject enrolled");
        getSubjectData();
        setSubjectId("");
      } catch (error) {
        alert(error);
      }
    }
  };

  const onSubjectPress = (item: any) => {
    navigation.navigate("studentAttendance", item);
  };
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
                    value={subjectId}
                    onChangeText={(text) => setSubjectId(text)}
                    label="Subject ID"
                    keyboardType="numeric"
                  />
                </Col>
              </Row>
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button
              icon={"notebook-plus-outline"}
              mode="outlined"
              onPress={onAddSubject}
            >
              Enroll Subject
            </Button>
          </Card.Actions>
        </Card>
        <View>
          {subjectList.map((item) => (
            <Card
              key={item.id}
              mode="outlined"
              style={{ marginVertical: 12 }}
              onPress={() => onSubjectPress(item)}
            >
              <Card.Content>
                <List.Item
                  title={item?.name}
                  description={item.comment}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={MD3Colors.tertiary70}
                      icon="book-check-outline"
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

export default EnrollSubjects;
