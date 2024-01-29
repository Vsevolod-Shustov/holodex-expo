import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useAtom } from "jotai"
import { queryOrg, saveToStorage, loadFromStorage } from '@/lib/data';
import { useEffect } from 'react';

export default function HomeLayout() {
  const [org, setOrg] = useAtom(queryOrg)
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