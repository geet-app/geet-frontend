"use client"
import { useState } from "react"
import Image from 'next/image'
import { Progress } from "../../../../components/ui/progress"
import { SERVER_URL } from "@/app/constants"
import { time } from "console"


const TEMPLATE_DATA = `Lorem ipsum dolor sit amet, consectetur adipiscing elit
Sed vel dolor a sem venenatis porta.
Pellentesque a condimentum dui.
Quisque non pretium leo.
Sed pellentesque convallis ultricies.
Proin sed massa velit.
Morbi placerat condimentum turpis non varius.
Aenean augue dolor, feugiat sit amet dapibus id,
maximus ut erat.
Interdum et malesuada fames ac ante ipsum primis in faucibus.`

var global_timeSync = []
var global_currentTime = 0
export default function App({
    params
}: {
    params: {
        id: string
    }
}) {
    let [bgColor, setBgColor] = useState("#434343")
    let [lyrics, setLyrics] = useState(TEMPLATE_DATA)
    let [timeSync, setTimeSync] = useState(Array(57).fill(0))
    let [currentTime, setCurrentTime] = useState(0)
    let [songProgress, setSongProgress] = useState(0)
    let [done, setDone] = useState(0);

    (async (setBgColor: any, setLyrics: any, setTimeSync: any, id: string, setDone, timeSync) => {
        if (done != 0) {
            return;
        }
        fetch(`${SERVER_URL}/lyric/${id}`).
            then(resp => resp.json()).
            then(data => {
                setBgColor(data.bgColor)
                setLyrics(data.lyrics)
                var dddd = data.timeSync.slice()
                for (let idx in data.timeSync) {
                    dddd[idx] = parseInt(data.timeSync[idx])
                }
                setTimeSync(dddd)
                console.log(dddd)
                console.log(timeSync)
                global_timeSync = dddd
                console.log(global_timeSync)
                setDone(1)
            })
    })(setBgColor, setLyrics, setTimeSync, params.id, setDone, timeSync)

    return (<>
        <SongPlayer id={params.id} setSongProgress={setSongProgress} bgColor={bgColor} setCurrentTime={setCurrentTime} timeSync={timeSync} currentTime={currentTime} />
        <ProgressBar progress={songProgress} bgColor={bgColor} />
        <LyricsHolder lyrics={lyrics} timeSync={timeSync} currentTime={currentTime} />
    </>)
}

function SongPlayer({
    id,
    setSongProgress,
    setCurrentTime,
    currentTime,
    timeSync,
    bgColor
}: {
    id: string,
    setSongProgress: any,
    setCurrentTime: any,
    currentTime: any,
    timeSync: any,
    bgColor: string
}) {
    let [thumbnail, setThumbnail] = useState("https://cdns-images.dzcdn.net/images/cover/6630083f454d48eadb6a9b53f035d734/350x350.jpg");
    let [audioSrc, setAudioSrc] = useState("https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3");
    let [title, setTitle] = useState("Cool Song!");
    let [artist, setArtist] = useState("John Doe");
    let [done, setDone] = useState(0);

    let [audioElement, setAudioElement] = useState(Array(1).fill(null));

    function updateProgress(setSongProgress: any, setCurrentTime: any) {
        var audioPlayer = document.getElementById("player")
        global_currentTime = audioPlayer.currentTime
        setSongProgress(audioPlayer.currentTime / audioPlayer.duration * 100)
    }

    function syncLyrics(timeSync: any, currentTime: any) {
        let currentItem: number = 0;
        for (let idx in global_timeSync) {
            if (global_timeSync[idx] > global_currentTime) {
                currentItem = idx;
                break;
            }
        }
        console.log(global_currentTime, global_timeSync)
        let id = "line-" + currentItem.toString()
        document.getElementById(id).classList.add("focus")
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });

    }
    (async (setThumbnail: any, setTitle: any, setArtist: any, setAudioElement: any, syncLyrics:any, updateProgress:any, donestate: any, setSongProgress:any, setCurrentTime:any, timeSync:any, currentTime:any) => {
        [done, setDone] = donestate
        if (done != 0) {
            return
        } else {
            setDone(1)
        }

        fetch(`${SERVER_URL}/song/${id}`).
            then(resp => resp.json()).
            then(data => {
                console.log(data.audio)
                setThumbnail(data.thumbnail);
                setTitle(data.title)
                setArtist(data.artist)
                setAudioElement([<audio id="player" onTimeUpdate={() => {
                        updateProgress(setSongProgress, setCurrentTime)
                        syncLyrics(timeSync, currentTime)
                    }}>
                        <source src={SERVER_URL +"/"+ data.audio} type="audio/mpeg" />
                    </audio>])
            })
    })(setThumbnail, setTitle, setArtist, setAudioElement, syncLyrics, updateProgress, [done, setDone], setSongProgress, setCurrentTime, timeSync, currentTime)

    
        
    return (
        <div className="rounded-lg music-player p-8" style={{ backgroundColor: bgColor }}>
            <Image className="rounded-lg mb-6" src={thumbnail} alt="album cover" width={420} height={420} />
            <h4>{title}</h4>
            <h5>By, {artist}</h5>
            {audioElement}
        </div>)
}

function ProgressBar({
    progress,
    bgColor
}: {
    progress: number,
    bgColor: string
}) {
    let [playing, setPlaying] = useState(false);

    function toggleSong(playing: any, setPlaying: any) {
        var playBtn = document.getElementById("play-btn")
        var audioPlayer = document.getElementById("player")
        if (playing) {
            playBtn.classList.add("fa-play")
            playBtn.classList.remove("fa-pause")
            audioPlayer.pause()
        } else {
            playBtn.classList.remove("fa-play")
            playBtn.classList.add("fa-pause")
            audioPlayer.play()
        }
        setPlaying(!playing)
    }
    return (
        <div className="flex progress-bar px-8 py-4 rounded-lg" style={{ backgroundColor: bgColor }}>
            <div className="playbtn cursor-pointer" onClick={() => toggleSong(playing, setPlaying)}><i id="play-btn" className="fas fa-play"></i></div>
            <Progress value={progress} style={{ color: "#70B8DE !important", marginTop: "1.5vh", marginLeft: "2.1vw" }} />
        </div>
    )
}

function LyricsHolder({
    lyrics,
    timeSync,
    currentTime
}: {
    lyrics: string,
    timeSync: Array<number>,
    currentTime: number
}) {
    var lyricElements: any[] = []
    let lines = lyrics.split('\n').map(line => line.trim())
    for (let idx in lines) {
        let line = lines[idx]
        lyricElements.push(<Line content={line} id={`line-${idx}`} />)
    }

    return (
        <div className="lyric-holder">
            {lyricElements}
        </div>
    )
}

function Line({
    content,
    id
}: {
    content: string,
    id: string
}) {
    return (<h1 className="font-inter lyric-line pb-12" id={id}>{content}</h1>)
}