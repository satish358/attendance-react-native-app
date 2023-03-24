import React from "react";
import { Drawer } from "react-native-paper";

const FacultyMentu = () => {
  const [active, setActive] = React.useState("");
  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="Second Item"
        active={active === "second"}
        onPress={() => setActive("second")}
      />
      <Drawer.CollapsedItem
        focusedIcon="inbox"
        unfocusedIcon="inbox-outline"
        label="Inbox"
      />
    </Drawer.Section>
  );
};

export default FacultyMentu;
