import React from "react";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import StudentSubject from "./StudentSubject";
import CreateSubjectScreen from "./CreateSubjectScreen";
import FacultyHome from "./FacultyHome";
import FacultyMentu from "./FacultyMentu";
import ViewAttendance from "./ViewAttendance";
import WelcomeScreen from "../WelcomeScreen";
import FacultyProfileScreen from "./FacultyProfile";

const FacultyDashboard = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "dashboard",
      title: "Home",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "createSubject",
      title: "Subjects",
      focusedIcon: "bookshelf",
    },
    {
      key: "viewAttendance",
      title: "Attendance",
      focusedIcon: "account-group",
      unfocusedIcon: "account-group-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account-cowboy-hat",
      unfocusedIcon: "account-cowboy-hat-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: WelcomeScreen,
    createSubject: CreateSubjectScreen,
    viewAttendance: ViewAttendance,
    profile: FacultyProfileScreen,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default FacultyDashboard;
