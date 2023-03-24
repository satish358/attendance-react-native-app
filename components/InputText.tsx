import React from "react";
import { TextInput } from "react-native-paper";
import { KeyboardTypeOptions } from "react-native/types";
import Col from "./Col";
import Row from "./Row";
export interface IInputText {
  label: string;
  name: string;
  value: string;
  setter: (name: string, value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  readOnly?: boolean;
}
const InputText = ({
  label,
  name,
  value,
  setter,
  keyboardType,
  disabled = false,
  readOnly = false,
}: IInputText) => {
  return (
    <Row>
      <Col noHorizontalPadding>
        <TextInput
          mode="outlined"
          disabled={disabled}
          editable={!readOnly}
          label={label}
          value={value}
          onChangeText={(text) => setter(name, text)}
          keyboardType={keyboardType || "default"}
        />
      </Col>
    </Row>
  );
};

export default InputText;
