import React from "react";
import { BottomNavigation } from "react-native-paper";
import HomePage from "../pages/HomePage";
import EnrollSubjects from "../pages/student/EnrollSubjects";
import ProfileScreen from "../pages/student/ProfileScreen";
import StudentDashboardScreen from "../pages/student/StudentDashboardScreen";
import StudentMain from "../pages/student/StudentMain";
import WelcomeScreen from "../pages/WelcomeScreen";

const TabsComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "dashboard",
      title: "Dashboard",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "scan",
      title: "Scan",
      focusedIcon: "qrcode",
    },
    {
      key: "subject",
      title: "Enroll Subjects",
      focusedIcon: "book-account",
      unfocusedIcon: "book-account-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: WelcomeScreen,
    scan: HomePage,
    profile: ProfileScreen,
    subject: EnrollSubjects,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TabsComponent;
