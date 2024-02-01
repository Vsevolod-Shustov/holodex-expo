import { Text, Button } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useContext(ThemeContext);

  return (
    <Button
      title="Switch Theme"
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  )
}