import { Text } from "react-native"
import { Link } from "expo-router"
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";
import { plainObject } from "@/app/_layout";

export default function IndexHeaderButtons() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Link href="/modal">modal {theme} {plainObject.theme}</Link>
    </>
  )
}