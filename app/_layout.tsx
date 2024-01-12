import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeLayout() {
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