import { useState, useEffect } from 'react'
import { Text } from 'react-native';
import { atom, useAtom } from 'jotai';
//import VideoGrid from '@/components/VideoGrid';
import VideoGrid from './VideoGrid';
import { queryOrg } from '@/lib/data';

//import { liveData } from '@/app/lib/data';
import { getLiveData } from '@/lib/data';
//const liveData = await getLiveData("Nijisanji")

//export const queryOrg = atom<string>("Hololive")


export default function Videos() {
  const [org] = useAtom(queryOrg);
  //console.log("videos.tsx queryOrg: " + org)
  const [liveData, setLiveData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await getLiveData(org)
      setLiveData(data)
    }
    if (org !== null) {
      getData()
    }
  }, [org])
  return (
    <>
      <Text style={{ color: 'red' }}>current org (jotai): {org}</Text>
      {org ? <VideoGrid videos={liveData}></VideoGrid> : <Text>Loading</Text>}
    </>
  )
}