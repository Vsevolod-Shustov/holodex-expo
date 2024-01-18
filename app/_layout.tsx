import { Slot } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  // console.log("window width: " + width);
  // console.log("window height: " + height)
  // console.log("scale: " + scale)
  // console.log("fontScale: " + fontScale)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});