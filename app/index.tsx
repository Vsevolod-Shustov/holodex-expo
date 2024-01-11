import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

//import Videos from "@/components/Videos"
import Videos from '@/components/Videos';


export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home page</Text>
      <Videos></Videos>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});