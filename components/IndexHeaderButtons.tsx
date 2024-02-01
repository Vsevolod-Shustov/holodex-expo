import { Text } from "react-native"
import { Link } from "expo-router"
import OrgSelector from "@/components/OrgSelectorButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function IndexHeaderButtons() {
  return (
    <>
      <OrgSelector></OrgSelector>
      <ThemeSwitcher></ThemeSwitcher>
    </>
  )
}