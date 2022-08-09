import { useRef, useState } from "react";

export default function Audio() {
    const [TrackIdx, SetTrackIdx] = useState(2);
    const audio = useRef();
    function handleTrack() {
        if(TrackIdx == 2) {
            SetTrackIdx(1);
        } else {
            SetTrackIdx(TrackIdx + 1);
        }
    }
    return (
        <div>
            <audio onPlay={e => e.target.currentTime = Math.random() * 60 + 60} ref={audio} onEnded={() => handleTrack()} preload="auto" src={`/Sounds/gta${TrackIdx}.mp3`} autoPlay></audio>
        </div>
    );
}