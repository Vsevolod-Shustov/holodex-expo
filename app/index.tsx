//import Videos from "@/components/Videos"
import Videos from '@/components/Videos';
import IndexHeaderButtons from '@/components/IndexHeaderButtons';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';


export default function Page() {
  const { colors } = useTheme();
  const themestyles = StyleSheet.create({
    container: {
      color: colors.background,
    },
  });
  return (
    <View style={{ ...styles.container, ...themestyles.container }}>
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
    //backgroundColor: 'black'
  },
});