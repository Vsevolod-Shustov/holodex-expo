import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useAtom } from "jotai"
import { queryOrg, saveToStorage, loadFromStorage, loadAtomFromStorage } from '@/lib/data';
import { useEffect } from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { createContext, useState } from 'react';

export const ThemeContext = createContext('dark');

export default function HomeLayout() {
  const [org, setOrg] = useAtom(queryOrg)

  const [theme, setTheme] = useState('dark');
  const themeData = { theme, setTheme };

  useEffect(() => {
    const resolveOrg = async () => {
      await loadAtomFromStorage('queryOrg', setOrg, 'Hololive').catch(console.error)
    }
    resolveOrg().catch(console.error)
  }, [])

  useEffect(() => {
    const resolveTheme = async () => {
      await loadAtomFromStorage('theme', setTheme, 'dark').catch(console.error)
    }
    resolveTheme().catch(console.error)
  }, [])
  //const { width, height, scale, fontScale } = useWindowDimensions();
  // console.log("window width: " + width);
  // console.log("window height: " + height)
  // console.log("scale: " + scale)
  // console.log("fontScale: " + fontScale)
  return (
    <ThemeContext.Provider value={themeData}>
      <ThemeProvider value={theme == 'light' ? DefaultTheme : DarkTheme}>
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
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}