import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

export default function App() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      ingredientName: "",
      quantity: "",
      unit: "",
    },
  });

  const [ingredients, setIngredients] = React.useState<any[]>([]);

  const addIngredient = (data: any) => {
    setIngredients([...ingredients, data]);
    reset();
    console.log("Ingredient added:", data);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    console.log("Ingredient removed at index:", index);
  };

  return (
    <View>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Ingredients",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <ScrollView>
          <View>
            {ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
                className="flex justify-center p-1"
              >
                <Text>{`${ingredient.ingredientName} - ${ingredient.quantity} ${ingredient.unit}`}</Text>
                <Button
                  title="Remove"
                  onPress={() => removeIngredient(index)}
                />
              </View>
            ))}
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="p-1"
                placeholder="Ingredient name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="ingredientName"
          />
          {errors.ingredientName && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="p-1"
                placeholder="Quantity"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="quantity"
          />
          {errors.quantity && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="p-"
                placeholder="Unit"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="unit"
          />
          {errors.unit && <Text>This is required.</Text>}

          <Button title="Submit" onPress={handleSubmit(addIngredient)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
