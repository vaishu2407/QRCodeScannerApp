import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Generate from "./screens/Generate";
import Scanner from "./screens/Scanner";

const stack = createNativeStackNavigator()
const App = () => {

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Generate" component={Generate} />
        <stack.Screen name="Scanner" component={Scanner} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
