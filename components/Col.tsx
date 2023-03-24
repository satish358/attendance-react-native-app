import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

export interface ICol {
  children: ReactNode | ReactNode[];
  styles?: ViewStyle;
  size?: number;
  noVerticalPadding?: boolean;
  noHorizontalPadding?: boolean;
}

const Col = (props: ICol) => {
  return (
    <View
      style={[
        props.styles,
        {
          flex: props?.size || 1,
          flexDirection: "column",
          paddingHorizontal: props?.noHorizontalPadding ? 0 : 18,
          paddingVertical: props?.noVerticalPadding ? 0 : 9,
        },
      ]}
    >
      {props.children}
    </View>
  );
};

export default Col;
