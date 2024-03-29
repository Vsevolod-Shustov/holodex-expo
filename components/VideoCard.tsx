//import Link from 'next/link'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from "react"
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';

export default function VideoCard(props: any) {
    const { colors } = useTheme();
    const themestyles = StyleSheet.create({
        text: {
            color: colors.text,
        },
    });
    //console.log("render")
    const channelImg = useMemo(() => props.video.channel.photo.replace("=s800", "=s48"), [props.video.channel.photo])

    const [liveDuration, setLiveDuration] = useState("")
    const [startsIn, setStartsIn] = useState("")

    const thumb = `http://img.youtube.com/vi/${props.video.id}/maxresdefault.jpg`

    const cardWidth = `${100 / props.numberOfColumns}%`

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
        <View style={{ ...styles.card, width: cardWidth }}>

            <View style={styles.thumbnail_container}>
                <Link asChild href={`https://www.youtube.com/watch/${props.video.id}`}>
                    <Pressable>
                        <Image
                            contentFit="contain"
                            style={styles.thumbnail_image}
                            source={{ uri: thumb }}
                        />
                    </Pressable>
                </Link>

                {props.video.topic_id ?
                    <View style={styles.video_topic}>
                        <Text style={{ color: '#e5e5e7', fontSize: 12 }}>{props.video.topic_id}</Text>
                    </View> : null}

                {props.video.status === "live" ?
                    <View style={styles.live_duration}>
                        <Text style={styles.live_duration_text}>{liveDuration}</Text>
                    </View> : null}
            </View>


            <View style={{ flex: 1, flexDirection: 'row', marginTop: 8 }}>

                <View style={{ maxWidth: '100%' }}>
                    <View style={{ maxWidth: '100%' }}>
                        <Link numberOfLines={2} href={`https://www.youtube.com/watch/${props.video.id}`}><Text style={themestyles.text}>{props.video.title}</Text></Link>
                    </View>

                    <View>
                        <Link numberOfLines={1} href={`https://www.youtube.com/channel/${props.video.channel.id}`}><Text style={{ color: 'royalblue' }}>{props.video.channel.english_name}</Text></Link>
                    </View>

                    <View>
                        {props.video.status === "live" ?
                            <Text><Text style={{ color: 'red' }}>Live Now</Text><Text style={themestyles.text}> • {props.video.live_viewers} watching</Text></Text> :
                            <Text style={themestyles.text}>Starts in {startsIn}</Text>}
                    </View>
                </View>
            </View>

        </View >
    )

    const channelThumb = <View style={{ padding: 8 }}>
        <Image
            source={{ uri: channelImg }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
        />
    </View>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        padding: 12,
        paddingBottom: 0
    },
    thumbnail_container: {
        position: 'relative',
        maxWidth: '100%',
    },
    thumbnail_image: {
        aspectRatio: 16 / 9,
        maxWidth: '100%',
        borderRadius: 8
    },
    video_topic: {
        position: 'absolute',
        top: 8,
        left: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    video_topic_text: {
        color: 'white',
        fontSize: 12
    },
    live_duration: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    live_duration_text: {
        color: 'red',
        fontSize: 12
    }
});