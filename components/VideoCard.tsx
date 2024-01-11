//import Link from 'next/link'
import { View, Image, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from "react"

export default function VideoCard(props: any) {
    const channelImg = useMemo(() => props.video.channel.photo.replace("=s800", "=s48"), [props.video.channel.photo])

    const [liveDuration, setLiveDuration] = useState("")
    const [startsIn, setStartsIn] = useState("")

    const thumb = `http://img.youtube.com/vi/${props.video.id}/maxresdefault.jpg`

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
        <View style={styles.card}>
            <View style={styles.thumbnail_container}>
                <Image
                    resizeMode='contain'
                    style={styles.thumbnail_image}
                    source={{ uri: thumb }}
                />
                <View style={styles.video_topic}>
                    <Text style={styles.video_topic_text}>{props.video.topic_id}</Text>
                </View>

                {props.video.status === "live" ? <View style={styles.live_duration}>
                    <Text style={styles.live_duration_text}>{liveDuration}</Text>
                </View> : <Text>""</Text>}

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
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: '50%',
        backgroundColor: 'green',
        marginBottom: 8
    },
    thumbnail_container: {
        position: 'relative',
        maxWidth: '100%',
    },
    thumbnail_image: {
        width: 1280,
        height: 720,
        aspectRatio: 16 / 9,
        maxWidth: '100%'
    },
    video_topic: {
        position: 'absolute',
        top: 16,
        left: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    video_topic_text: {
        color: 'white'
    },
    live_duration: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    live_duration_text: {
        color: 'red'
    }
});