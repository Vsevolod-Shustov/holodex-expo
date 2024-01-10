import { Text, View } from 'react-native';
import { Link } from 'expo-router';

//import Videos from "@/components/Videos"
import Videos from '@/components/Videos';


export default function Page() {
  return (
    <View>
      <Text>Home page</Text>
      <Videos></Videos>
    </View>
  );
}
