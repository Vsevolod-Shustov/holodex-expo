import { Text } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";

export default function OrgSelector() {
  return (
    <>
      <Link href="/orgSelectorModal"><Ionicons name="filter" size={24} color="black" /></Link>
    </>
  )
}