import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { Link, router, Stack } from 'expo-router';
import { useAtom } from "jotai"
import { queryOrg, saveToStorage } from '@/lib/data';

const items = [
  { title: "All Vtubers", value: "All" },
  { title: "Independents", value: "Independents" },
  { title: "Hololive", value: "Hololive" },
  { title: "Nijisanji", value: "Nijisanji" },
]

export default function OrgSelectorModal() {
  const isPresented = router.canGoBack();
  const [org, setOrg] = useAtom(queryOrg)
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Org',
          headerRight: () =>
            !isPresented && <Link href="../">Dismiss</Link>,
        }}
      />
      <Text style={{ color: 'red' }}>current org (jotai): {org}</Text>
      <View>
        {items.map((item) => (
          <Pressable
            key={item.value}
            style={styles.button}
            onPress={() => {
              console.log("org selector changed to: " + item.value);
              setOrg(item.value);
              saveToStorage("queryOrg", item.value);
            }}
          >
            <Text style={styles.buttonText}>{item.value}</Text>
          </Pressable>
        ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#0099ff',
    padding: 16,
    margin: 8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});