import React, { useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import Col from "./Col";
import Row from "./Row";
import CalendarPicker from "react-native-calendar-picker";

export interface IDatePicker {
  onChange: (date: Date) => void;
}
const DatePicker = ({ onChange }: IDatePicker) => {
  const [formValues, setFormValues] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = React.useState(false);
  const onFieldChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const onDateChange = (d: any) => {
    setDate(d);
    onChange(d);
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Row>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. {date.toISOString()}</Text>
          <Row>
            <Col>
              <CalendarPicker onDateChange={onDateChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onPress={hideModal} mode="outlined">
                OK{" "}
              </Button>
            </Col>
          </Row>
        </Modal>
      </Portal>

      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Select Date
      </Button>
    </Row>
  );
};

export default DatePicker;
