const HOLODEX_API_KEY = "af406626-bc8d-4140-977c-2341a5def331"
const apiUrl = "https://holodex.net/api/v2/live"
//export const queryOrg = "Hololive"

export async function getLiveData(queryOrg = "Hololive") {
  try {
    let fetchUrl = new URL(apiUrl)
    const org = queryOrg
    if (org !== "All") { fetchUrl.searchParams.append("org", org) }
    console.log(fetchUrl);
    const response = await fetch(fetchUrl, {
      headers: {
        "X-APIKEY": HOLODEX_API_KEY
      },
      cache: 'no-store'
    });
    const live = await response.json();
    console.log("data.ts: ");
    console.log(live);
    return live;
  } catch (error) {
    console.log(error)
  }
}