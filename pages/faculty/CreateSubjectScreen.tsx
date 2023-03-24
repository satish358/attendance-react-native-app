import { useNavigation } from "@react-navigation/native";
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

const CreateSubjectScreen = () => {
  const navigation = useNavigation<any>();
  const [subjectList, setSubjectList] = React.useState<any[]>([]);

  const getSubjectData = async () => {
    try {
      const { data: res } = await getAuth(`/faculty/subject/getAll`);
      setSubjectList(res.data);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getSubjectData();
  }, []);

  const [formValues, setFormValues] = React.useState({
    name: "",
    comment: "",
  });
  //Alert States
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const onFieldChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegisterClick = async () => {
    try {
      const { status } = await postAuth("/faculty/subject/create", formValues);
      if (status === 201) {
        alert("Subject Added");
        setFormValues({
          name: "",
          comment: "",
        });
        getSubjectData();
      }
    } catch (err) {
      alert(err);
    }
  };

  const onSubjectPress = (item: any) => {
    navigation.navigate("studentAttache", item);
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
                    value={formValues.name}
                    onChangeText={(text) => onFieldChange("name", text)}
                    label="Subject Name"
                  />
                </Col>
              </Row>

              <Row>
                <Col noHorizontalPadding>
                  <TextInput
                    mode="outlined"
                    value={formValues.comment}
                    onChangeText={(text) => onFieldChange("comment", text)}
                    label="Description"
                  />
                </Col>
              </Row>
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 12 }}>
            <Button mode="outlined" onPress={onRegisterClick}>
              Create Subject
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
              key={item.id}
              mode="outlined"
              style={{ marginVertical: 6 }}
              onPress={() => onSubjectPress(item)}
            >
              <Card.Content>
                <List.Item
                  title={`${item?.name} [ ${item?.id} ] `}
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

export default CreateSubjectScreen;
