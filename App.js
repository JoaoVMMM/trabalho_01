import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EmailListScreen from "./Screens/EmailListScreen";
import EmailMenssageScreen from "./Screens/EmailMenssageScreen";

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='EmailListScreen' component={EmailListScreen} options={{headerShown: false}}/>
        <Stack.Screen name='EmailMessageScreen' component={EmailMenssageScreen} options={{ title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};