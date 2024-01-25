import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

export default function HomeLayout() {
  //const { width, height, scale, fontScale } = useWindowDimensions();
  // console.log("window width: " + width);
  // console.log("window height: " + height)
  // console.log("scale: " + scale)
  // console.log("fontScale: " + fontScale)
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0099ff'
        }
      }} >
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="orgSelectorModal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}