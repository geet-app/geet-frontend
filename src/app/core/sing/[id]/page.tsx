"use client"
import { useState } from "react"
import Image from 'next/image'
import { Progress } from "../../../../components/ui/progress"
import { SERVER_URL } from "@/app/constants"


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

export default function App({
    params
} : {
    params : {
        id : string
    }
}) {
    let [bgColor, setBgColor] = useState("#434343")
    let [lyrics, setLyrics] = useState(TEMPLATE_DATA)
    let [timeSync, setTimeSync] = useState([10,20,30,40,50,60,70,80,90,100])
    let [currentTime, setCurrentTime] = useState(0)
    let [songProgress, setSongProgress] = useState(0)
    let [done, setDone] = useState(0);

    ((setBgColor:any, setLyrics:any, setTimeSync:any, id:string) => {
        fetch(`${SERVER_URL}/lyric/${id}`).
        then (resp => resp.json()).
        then (data => {
            console.log("HELOO FROM THE OTHERSIDE")
            setBgColor(data.bgColor)
            setLyrics(data.lyrics)
            setTimeSync(data.timeSync)
        })
    })(setBgColor, setLyrics, setTimeSync, params.id)

    return (<>
        <SongPlayer id={params.id} setSongProgress={setSongProgress} bgColor={bgColor} setCurrentTime={setCurrentTime}/>
        <ProgressBar progress={songProgress} bgColor={bgColor}/>
        <LyricsHolder lyrics={lyrics} timeSync={timeSync} currentTime={currentTime}/>
    </>)
}

function SongPlayer({
    id,
    setSongProgress,
    setCurrentTime,
    bgColor
} : {
    id : string,
    setSongProgress : any,
    setCurrentTime : any,
    bgColor : string
}) {
    let [thumbnail, setThumbnail] = useState("https://cdns-images.dzcdn.net/images/cover/6630083f454d48eadb6a9b53f035d734/350x350.jpg");
    let [audioSrc, setAudioSrc] = useState("https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3");
    let [title, setTitle] = useState("Cool Song!");
    let [artist, setArtist] = useState("John Doe");
    let [done, setDone] = useState(0);

    (async (setThumbnail:any, setTitle:any, setArtist:any, setAudioSrc:any, donestate:any) => {
        [done, setDone] = donestate
        if (done != 0) {
            return
        } else {
            setDone(1)
        }

        fetch(`${SERVER_URL}/song/${id}`).
        then (resp => resp.json()).
        then (data => {
            setThumbnail(data.thumbnail);
            setTitle(data.title)
            setArtist(data.artist)
            //setAudioSrc(data.audio)
        })
    })(setThumbnail, setTitle, setArtist, setAudioSrc, [done, setDone])


    return (
    <div className="rounded-lg music-player p-8" style={{backgroundColor : bgColor}}>
        <Image className="rounded-lg mb-6" src={thumbnail} alt="album cover" width={420} height={420}/>
        <h4>{title}</h4>
        <h5>By, {artist}</h5>
        <audio id="player">
            <source src={audioSrc} type="audio/mpeg"/>
        </audio>
    </div>)
}

function ProgressBar({
    progress,
    bgColor
} : {
    progress : number,
    bgColor : string
}) {
    let [playing, setPlaying] = useState(false);

    function toggleSong(playing:any, setPlaying:any) {
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
            <div className="flex progress-bar px-8 py-4 rounded-lg" style={{backgroundColor : bgColor}}>
                <div className="playbtn cursor-pointer" onClick={() => toggleSong(playing, setPlaying)}><i id="play-btn" className="fas fa-play"></i></div>
                <Progress value={50} style={{color: "#70B8DE !important", marginTop : "1.5vh", marginLeft: "2.1vw"}}/>
            </div>
    )
}

function LyricsHolder({
    lyrics,
    timeSync,
    currentTime
} : {
    lyrics : string,
    timeSync : Array<number>,
    currentTime : number
}) {
    var lyricElements : any[] = []
    let lines = lyrics.split('\n').map(line => line.trim())
    for (let idx in lines) {
        let line = lines[idx]
        lyricElements.push(<Line content={line} id={`line-${idx}`}/>)
    }

    let currentItem:number = 0;
    for (let idx in timeSync) {
        if (timeSync[idx] < currentTime) {
            currentItem = idx;
            break;
        }
    }
    try {
        let id = "line-"+currentItem.toString()
        document.getElementById(id).classList.add("focus")
        document.getElementById(id).scrollIntoView({
            behavior:"smooth"
        });
    } catch {

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
} : {
    content : string,
    id : string
}) {
    return (<h1 className="font-inter lyric-line pb-12" id={id}>{content}</h1>)
}