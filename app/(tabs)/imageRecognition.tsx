import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function imageRecognition() {
  return (
    <View>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Image Recognition",
          }}
        />
      </View>
    </View>
  );
}
