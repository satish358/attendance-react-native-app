import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Appbar } from "react-native-paper";

const AppBarComponent = (props: NativeStackHeaderProps) => {
  return (
    <Appbar.Header elevated>
      <Appbar.Content title={props.options.title} />
    </Appbar.Header>
  );
};

export default AppBarComponent;
