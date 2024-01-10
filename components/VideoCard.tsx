//import Link from 'next/link'
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
        <div
            className="video-card relative">
            <div>
                <div
                    className="video-thumbnail relative">
                    <a
                        className="block"
                        href={`https://youtu.be/${props.video.id}`}
                        target="_blank"
                    >
                        <img
                            className="rounded"
                            src={`http://img.youtube.com/vi/${props.video.id}/maxresdefault.jpg`}
                        ></img>
                        <div
                            className="video-topic absolute top-1 left-1 rounded-sm bg-black bg-opacity-80 text-white text-sm px-1 py-px">
                            {props.video.topic_id}
                        </div>

                        {props.video.status === "live" ? <div
                            className="video-live absolute bottom-1 right-1 rounded-sm bg-red-800 bg-opacity-80 text-white text-sm px-1 py-px">{liveDuration}</div> : ""}

                    </a>
                </div>

                <div className="video-text flex mt-2">
                    <div className="flex-none p-2">
                        <img
                            className="rounded-full w-12 h-12"
                            src={channelImg}
                        ></img>
                    </div>
                    <div>
                        <div className="max-h-10 leading-5 line-clamp-2">
                            <Link href={`watch/${props.video.id}`}>{props.video.title}</Link>
                        </div>
                        <div>
                            <a
                                className="text-blue-400"
                                target="_blank"
                                href={`https://www.youtube.com/channel/${props.video.channel.id}`}>
                                {props.video.channel.english_name}
                            </a>
                        </div>
                        <div>
                            {props.video.status === "live" ?
                                <span><span className="text-red-500">Live Now</span> • {props.video.live_viewers} watching</span> :
                                <span>Starts in {startsIn}</span>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}