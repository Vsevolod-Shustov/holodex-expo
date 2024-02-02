import { Text, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { useTheme } from '@react-navigation/native';

export default function OrgSelector() {
  const { colors } = useTheme();
  const themestyles = StyleSheet.create({
    text: {
      color: colors.text,
    },
  });
  return (
    <>
      <Link href="/orgSelectorModal"><Ionicons name="filter" size={24} style={themestyles.text} /></Link>
    </>
  )
}