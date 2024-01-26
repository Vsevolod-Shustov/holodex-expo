//import Videos from "@/components/Videos"
import Videos from '@/components/Videos';
import IndexHeaderButtons from '@/components/IndexHeaderButtons';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Link, Stack } from 'expo-router';


export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Home',
          headerRight: () => <IndexHeaderButtons></IndexHeaderButtons>,
        }}
      />
      <Videos></Videos>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});