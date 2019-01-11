import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./Home";
import Settings from "./Settings";
import Register from "../components/Register";
import colors from "../styles/colors";

const AppNavigator = createStackNavigator(
  {
    Home,
    Settings,
    Register
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.red2
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    },
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
