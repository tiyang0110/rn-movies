import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({navigation: {setOptions}}) => (
  <TouchableOpacity onPress={() => setOptions({title: 'hihi'})}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const ScreenThree = ({navigation: { navigate}}) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Three</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{headerBackTitleVisible:false, presentation:"modal"}}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;