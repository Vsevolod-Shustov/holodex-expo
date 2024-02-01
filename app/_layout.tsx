import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useAtom } from "jotai"
import { queryOrg, saveToStorage, loadFromStorage } from '@/lib/data';
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
      const storedOrg = await loadFromStorage("queryOrg")
      if (storedOrg) {
        setOrg(storedOrg)
        console.log("_layout.tsx: setting org to " + storedOrg)
      } else {
        setOrg("Hololive")
        console.log("_layout.tsx: no stored org, setting to Hololive")
      }
    }
    resolveOrg().catch(console.error)
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