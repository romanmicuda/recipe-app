import { Stack } from "expo-router";
import { StyleSheet, Image, Platform } from "react-native";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Expore Recipes",
          }}
        />
      </View>
    </View>
  );
}
