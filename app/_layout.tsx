import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useState } from 'react';

export const ThemeContext = createContext('light');

export const plainObject = { 'theme': 'dark' }

export default function HomeLayout() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  // console.log("window width: " + width);
  // console.log("window height: " + height)
  // console.log("scale: " + scale)
  // console.log("fontScale: " + fontScale)
  return (
    <ThemeContext.Provider value={'gray'}>
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
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}