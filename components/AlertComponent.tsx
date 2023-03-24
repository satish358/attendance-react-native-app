import React, { useEffect } from "react";
import { Button, Dialog, Text } from "react-native-paper";
export interface IAlertComponent {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  title?: string;
}
function AlertComponent({
  visible,
  onDismiss,
  message,
  title = "Alert",
}: IAlertComponent) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{message}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default AlertComponent;
