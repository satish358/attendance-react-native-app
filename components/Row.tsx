import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { JsxElement } from "typescript";

export interface IRow {
  children: ReactNode | ReactNode[];
  styles?: ViewStyle;
}
const Row = (props: IRow) => {
  return (
    <View
      style={[
        props.styles,
        {
          flexDirection: "row",
        },
      ]}
    >
      {props.children}
    </View>
  );
};

export default Row;
