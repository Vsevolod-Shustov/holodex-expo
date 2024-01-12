import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

//import Videos from "@/components/Videos"
import Videos from '@/components/Videos';


export default function Page() {
  return (
    <SafeAreaView>
      <Videos></Videos>
    </SafeAreaView>
  );
}