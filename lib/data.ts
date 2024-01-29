import { atom } from "jotai"
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

export async function saveToStorage(key, value) {
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}

export async function loadFromStorage(key: string) {
  let result = "null"
  if (Platform.OS !== "web") {
    result = await SecureStore.getItemAsync(key);
  } else {
    result = localStorage.getItem(key);
  }
  if (result) {
    return result
  } else {
    console.log('No values stored under that key.');
    return null
  }
}

const HOLODEX_API_KEY = "af406626-bc8d-4140-977c-2341a5def331"
const apiUrl = "https://holodex.net/api/v2/live"

export const queryOrg = atom<string | null>(null)

export async function getLiveData(queryOrg) {
  try {
    let fetchUrl = new URL(apiUrl)
    const org = queryOrg
    console.log("getLiveData org: " + org)
    if (org !== "All") { fetchUrl.searchParams.append("org", org) }
    console.log("getLiveData fetchUrl: " + fetchUrl);
    const response = await fetch(fetchUrl, {
      headers: {
        "X-APIKEY": HOLODEX_API_KEY
      },
      cache: 'no-store'
    });
    const live = await response.json();
    //console.log("data.ts: ");
    //console.log(live[0]);
    return live;
  } catch (error) {
    console.log(error)
  }
}