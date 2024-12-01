import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";

export default function imageRecognition() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const TensorCamera = cameraWithTensors(CameraView);

  const handleCameraStream = async (images: any) => {
    console.log("Camera stream started");
    const model = await tf.loadGraphModel(
      "https://www.kaggle.com/models/google/mobilenet-v2/TfJs/035-128-classification/3",
      { fromTFHub: true }
    );

    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (nextImageTensor) {
        const predictions = await model.predict(nextImageTensor);
        console.log("Predictions:", predictions);
        tf.dispose([nextImageTensor]);
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Image Recognition",
          }}
        />
        <Text className="m-5">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Image Recognition",
          }}
        />
      </View>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCameraStream}>
            <Text style={styles.text}>Detect Ingredients</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
