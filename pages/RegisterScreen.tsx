import React, { useState } from "react";
import { Card, RadioButton, Text, TextInput } from "react-native-paper";
import { Platform, ScrollView, View } from "react-native";
import Col from "../components/Col";
import Row from "../components/Row";
import { Button } from "react-native-paper";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import InputText from "../components/InputText";
import { KeyboardTypeOptions } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DatePicker from "../components/DatePicker";
import { post } from "../services/api.service";

const inputList = [
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "college",
    label: "College Name",
  },
];

const onlyStudentsInput = [
  {
    name: "prn",
    label: "PRN",
  },
  {
    name: "course",
    label: "Course Name",
  },
  {
    name: "age",
    label: "Age",
    keyType: "numeric",
  },
];

export interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}
const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    prn: "",
    course: "",
    age: "",
    college: "",
    role: "STUDENT",
    joiningDate: "",
  });

  const onFieldChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = () => {
    if (
      formValues.email &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.firstName &&
      formValues.lastName &&
      formValues.college &&
      formValues.role
    ) {
      post("/api/auth/register", formValues)
        .then((res) => {
          if (res.status === 201) {
            alert("User successfully registered");
            setFormValues({
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              prn: "",
              course: "",
              age: "",
              college: "",
              role: "STUDENT",
              joiningDate: "",
            });
          } else {
            alert("API FAIL");
          }
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    } else {
      alert("Please fill all details");
    }
  };

  const onLoginPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Col>
        <Card mode="outlined">
          <Card.Content>
            <Row>
              <RadioButton.Group
                onValueChange={(value) => onFieldChange("role", value)}
                value={formValues.role}
              >
                <RadioButton.Item label="Student" value="STUDENT" />
                <RadioButton.Item label="Faculty" value="FACULTY" />
              </RadioButton.Group>
            </Row>
            <View>
              {inputList.map((item) => (
                <InputText
                  key={item.name}
                  name={item.name}
                  value={formValues[item.name]}
                  label={item.label}
                  setter={onFieldChange}
                />
              ))}

              {formValues.role === "STUDENT" &&
                onlyStudentsInput.map((item) => (
                  <InputText
                    key={item.name}
                    name={item.name}
                    value={formValues[item.name]}
                    label={item.label}
                    setter={onFieldChange}
                    keyboardType={
                      item?.keyType
                        ? (item.keyType as KeyboardTypeOptions)
                        : "default"
                    }
                  />
                ))}
              {formValues.role === "FACULTY" && (
                <Row>
                  <Col noHorizontalPadding>
                    <TextInput
                      mode="outlined"
                      value={formValues["joiningDate"]}
                      onChangeText={(text) =>
                        onFieldChange("joiningDate", text)
                      }
                      label="Joining Date"
                      placeholder="YYYY-MM-DD"
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col noHorizontalPadding>
                  <TextInput
                    value={formValues["password"]}
                    onChangeText={(text) => onFieldChange("password", text)}
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                  />
                </Col>
                <Col noHorizontalPadding>
                  <TextInput
                    value={formValues["confirmPassword"]}
                    onChangeText={(text) =>
                      onFieldChange("confirmPassword", text)
                    }
                    mode="outlined"
                    label="Confirm Password"
                    secureTextEntry
                  />
                </Col>
              </Row>
            </View>
          </Card.Content>
          <Card.Actions style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
            <Row>
              <Col noHorizontalPadding>
                <Button mode="contained" onPress={onSubmit}>
                  Register
                </Button>
              </Col>
            </Row>
          </Card.Actions>
        </Card>
      </Col>
    </ScrollView>
  );
};

export default RegisterScreen;
