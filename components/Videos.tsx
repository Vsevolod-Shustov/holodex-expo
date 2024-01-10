import { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai';
//import VideoGrid from '@/components/VideoGrid';
import VideoGrid from './VideoGrid';

//import { liveData } from '@/app/lib/data';
import { getLiveData } from './../lib/data';
//const liveData = await getLiveData("Nijisanji")

export const queryOrg = atom<string>("Hololive")


export default function Videos() {
  const [org] = useAtom(queryOrg);
  const [liveData, setLiveData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await getLiveData(org)
      setLiveData(data)
    }

    getData()
  }, [org])
  return (
    <>
      <VideoGrid videos={liveData}></VideoGrid>
    </>
  )
}