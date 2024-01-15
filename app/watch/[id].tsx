import { View, Text, Button, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Page() {
  const local = useLocalSearchParams();

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <Text style={{ color: 'blue' }}>watch a video with id {local.id} </Text>
      {(Platform.OS !== 'web') ?
        <View>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={local.id}
            onChangeState={onStateChange}
          />
          <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </View>
        :
        <iframe className="absolute w-full h-full" width="1280" height="720" src={`https://www.youtube.com/embed/${local.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      }
    </View>
  );
}