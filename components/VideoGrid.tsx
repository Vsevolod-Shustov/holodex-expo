//import { useAtom } from 'jotai'
import { View, FlatList } from "react-native";
import VideoCard from "@/components/VideoCard";
//import OrgSelectorDropdown from "@/components/OrgSelectorDropdown";
//import { liveData, getLiveData } from "@/app/lib/data";
// let data = await liveData;
type Video = {
  id: string,
  title: string,
  type: string,
  topic_id: string,
  published_at: string,
  available_at: string,
  duration: number,
  status: string,
  channel: object
}

export default function VideoGrid({ videos }: { videos: Array<Video> }) {
  //const [videos] = useAtom(liveData)
  // console.log("VideoGrid:");
  // console.log(data[0]);
  //const data = await getLiveData();
  //const data = await getVideos();
  const data = videos;

  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
      keyExtractor={item => item.id}
      numColumns={2}
    />
  )
}