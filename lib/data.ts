import { atom } from "jotai"
import * as SecureStore from 'expo-secure-store';

export async function saveToStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function loadFromStorage(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result
  } else {
    //console.log('No values stored under that key.');
    return null
  }
}

const HOLODEX_API_KEY = "af406626-bc8d-4140-977c-2341a5def331"
const apiUrl = "https://holodex.net/api/v2/live"
//export const queryOrg = "Hololive"


async function loadQueryOrgFromStore() {
  //await saveToStorage("queryOrg", "Nijisanji")
  const storedQueryOrg = await loadFromStorage("queryOrg")
  console.log("storedQueryOrg: " + storedQueryOrg)
  let atomQueryOrg = ""
  if (storedQueryOrg) {
    atomQueryOrg = storedQueryOrg
  } else {
    atomQueryOrg = "Hololive"
  }
  console.log("atomQueryOrg: " + atomQueryOrg)
  return atomQueryOrg
}

//let a = await loadQueryOrgFromStore();
//console.log("a: " + a)
//let setAtomQueryOrg = ""
//loadQueryOrgFromStore().then(r => { console.log("r: " + r); setAtomQueryOrg = r })

//export var queryOrg = atom(setAtomQueryOrg)

export const queryOrg = atom<string>("Hololive")

export async function getLiveData(queryOrg) {


  try {
    let fetchUrl = new URL(apiUrl)
    //const org = queryOrg
    const org = await loadQueryOrgFromStore()
    console.log("getLiveData org: " + org)
    if (org !== "All") { fetchUrl.searchParams.append("org", org) }
    console.log(fetchUrl);
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