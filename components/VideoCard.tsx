//import Link from 'next/link'
import { View, Image, Text } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from "react"

export default function VideoCard(props: any) {
    const channelImg = useMemo(() => props.video.channel.photo.replace("=s800", "=s48"), [props.video.channel.photo])

    const [liveDuration, setLiveDuration] = useState("")
    const [startsIn, setStartsIn] = useState("")

    useEffect(() => {
        if (props.video.status === "live" && props.video.start_actual) {
            const start_actual = Date.parse(props.video.start_actual)
            const now = Date.now()
            const live_duration = now - start_actual
            const dateObj = new Date(live_duration)
            const duration_string = dateObj.toISOString().substring(11, 19)
            setLiveDuration(duration_string)
        } else if (props.video.status === "upcoming" && props.video.start_scheduled) {
            const start_scheduled = Date.parse(props.video.start_scheduled)
            const now = Date.now()
            const starts_in = start_scheduled - now
            const dateObj = new Date(starts_in)
            const starts_in_string = dateObj.toISOString().substring(11, 19)
            setStartsIn(starts_in_string)
        }
    }, [])


    return (
        <View
            className="video-card relative">
            <View>
                <View
                    className="video-thumbnail relative">
                    <Image
                        source={{ uri: `http://img.youtube.com/vi/${props.video.id}/maxresdefault.jpg` }}
                        style={{ width: 400, height: 400 }}
                    />
                    <View
                        className="video-topic absolute top-1 left-1 rounded-sm bg-black bg-opacity-80 text-white text-sm px-1 py-px">
                        <Text>{props.video.topic_id}</Text>
                    </View>

                    {props.video.status === "live" ? <View
                        className="video-live absolute bottom-1 right-1 rounded-sm bg-red-800 bg-opacity-80 text-white text-sm px-1 py-px"><Text>{liveDuration}</Text></View> : <Text>""</Text>}

                </View>

                <View className="video-text flex mt-2">
                    <View className="flex-none p-2">
                        <Image
                            source={channelImg}
                        />
                    </View>
                    <View>
                        <View className="max-h-10 leading-5 line-clamp-2">
                            <Link href={`watch/${props.video.id}`}><Text>{props.video.title}</Text></Link>
                        </View>
                        <View>
                            {props.video.status === "live" ?
                                <Text>Live Now • {props.video.live_viewers} watching</Text> :
                                <Text>Starts in {startsIn}</Text>}
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}