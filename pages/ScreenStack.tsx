import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useState } from "react";
import AppBarComponent from "../components/AppBarComponent";
import AttacheStudentToSubjectScreen from "./faculty/AttacheStudentToSubjectScreen";
import CreateSubjectScreen from "./faculty/CreateSubjectScreen";
import FacultyDashboard from "./faculty/FacultyDashboard";
import HomePage from "./HomePage";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ServerSetupPage from "./ServerSetupPage";
import StudentAttendanceScreen from "./student/StudentAttendanceScreen";
import StudentDashboardScreen from "./student/StudentDashboardScreen";
const Stack = createNativeStackNavigator();
export const UserDetailsContext = createContext<any>({});
export const containerRef = React.createRef<any>();
const ScreenStack = () => {
  const [userInformation, setUserInformation] = useState({});
  return (
    <UserDetailsContext.Provider
      value={{
        data: userInformation,
        setter: setUserInformation,
      }}
    >
      <NavigationContainer ref={containerRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="serverSetup"
            component={ServerSetupPage}
            options={{
              header: (props) => <AppBarComponent {...props} />,
              title: "Server Setup",
            }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              header: (props) => <AppBarComponent {...props} />,
              title: "Login",
            }}
          />
          <Stack.Screen
            name="facultyDashboard"
            component={FacultyDashboard}
            options={{
              header: (props) => <AppBarComponent {...props} />,
              title: "Faculty Dashboard",
            }}
          />
          <Stack.Screen
            name="studentAttache"
            component={AttacheStudentToSubjectScreen}
            options={{ headerTitle: "Students List" }}
          />

          <Stack.Screen
            name="createSubject"
            component={CreateSubjectScreen}
            options={{ headerTitle: "Create Subject" }}
          />

          <Stack.Screen
            name="studentDashboard"
            component={StudentDashboardScreen}
            options={{
              header: (props) => <AppBarComponent {...props} />,
              title: "Student Dashboard",
            }}
          />
          <Stack.Screen
            name="home"
            component={HomePage}
            options={{
              header: (props) => <AppBarComponent {...props} />,
              title: "Home Page",
            }}
          />

          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ headerTitle: "Register" }}
          />
          <Stack.Screen
            name="studentAttendance"
            component={StudentAttendanceScreen}
            options={{ headerTitle: "My Attendance" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDetailsContext.Provider>
  );
};

export default ScreenStack;
