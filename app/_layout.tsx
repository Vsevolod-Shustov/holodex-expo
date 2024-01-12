import { Slot } from 'expo-router';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeLayout() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Slot />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});