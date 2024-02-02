import { Text, Button, Pressable, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { saveToStorage } from "@/lib/data";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const themestyles = StyleSheet.create({
    text: {
      color: colors.text,
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        const themeToSet = theme === 'light' ? 'dark' : 'light'
        setTheme(themeToSet)
        saveToStorage('theme', themeToSet)
      }}
    >
      <MaterialCommunityIcons style={{ ...styles.moon, ...themestyles.text, ...(theme === 'light' ? styles.inactive : "") }} name="moon-waning-crescent" size={24} color="black" />
      <Feather style={{ ...styles.sun, ...themestyles.text, ...(theme === 'dark' ? styles.inactive : "") }} name="sun" size={16} color="black" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 4,
    position: 'relative',
    width: 28

  },
  moon: {

  },
  sun: {
    position: 'absolute',
    right: 0,
    top: 4
  },
  inactive: {
    opacity: 0.33
  }
})