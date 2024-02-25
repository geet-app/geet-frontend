"use client"
import { useState } from "react"
import { Progress } from "../../../../../components/ui/progress"
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex"
import { SERVER_URL } from "../../../../constants"

export default function App({
    params
} : {
    params : {
        analysisUid : string,
        videoId : string
    }
}) {
    let [analysis, setAnalysis] = useState({
        "recordingURL" : "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
        "originalVocalsURL" : "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
        "bgColor" : "#ababab",
        "netscore" : 5,
        "artist" : "John Doe",
        "title" : "Hey Jude",

        "length_diff" : 5,
        "breaks_diff" : -5,

        recording_freq : 25,
        vocal_freq : 20,
        
        recording_tempo : 20,
        vocal_tempo : 15 
    });

    (setAnalysis => {
        fetch(`${SERVER_URL}/analyse/${params.videoId}/1`).
        then (resp => resp.json()).
        then (data => {
            setAnalysis(data)
        })
    })(setAnalysis)

    return (
        <div className="my-container px-14">
            <h1 className="subtitle text-8xl">Analysis</h1>
            <h3 className="font-inter yeehaw pt-4 pb-8 font-bold">You scored <span className=" shade font-black rock-color">{analysis.netscore}</span>/10 <br/><span className="font-medium text-3xl">on the song</span><br/> {analysis.title}, By <span className="underline">{analysis.artist}</span></h3>
            <h2 className="subsubtitle">Lets first listen and compare</h2>
            <Para>Here is your recording</Para>
            <AudioElement id="recording" src={analysis.recordingURL} bgColor={analysis.bgColor}/>
            <Para>Here are the vocals of the original song</Para>
            <AudioElement id="vocals" src={analysis.originalVocalsURL} bgColor={analysis.bgColor}/>
            <h2 className="subsubtitle mt-16">Now for some basic analysis we can see</h2>
            <div className="flex flex-row">
                <ExpositionDiv bgColor={analysis.bgColor} >
                    <h1 className="section-head">Difference in Length</h1>
                    <p className="font-inter font-medium mt-2 info">Length difference analyses how long did you actually sing in comparision to the actual artist</p><br/>
                    <p className="jury font-inter">For this section you {getBreaksAnalysisVerdict(analysis.length_diff)} </p>
                </ExpositionDiv>
                <ExpositionDiv bgColor={analysis.bgColor}>
                    <h1 className="section-head">Breaks Taken</h1>
                    <p className="font-inter font-medium mt-2 info">Breaks taken is calculated based on how many more times did you stop during singing, or in general were inaudible</p><br/>
                    <p className="jury font-inter">For this section you {getLengthAnalysisVerdict(analysis.breaks_diff)} </p>
                </ExpositionDiv>
            </div>
            <h2 className="subsubtitle mt-16">Now delving deeper into your song</h2>
            <PitchComparision recFreq={analysis.recording_freq} vocFreq={analysis.vocal_freq} bgColor={analysis.bgColor}/>
            <h2 className="subsubtitle mt-16">Now delving deeper into your song</h2>
            <TempoComparision recTempo={analysis.recording_freq} vocTempo={analysis.vocal_freq} bgColor={analysis.bgColor}/>
        </div>
    )
}

function getBreaksAnalysisVerdict(score : number) {
    let diff = Math.abs(score)
    if (score > 0) {
        return <span>You took <b>${diff}</b> more breaks than the actual artist, you can remedy this by breathing deeper and slowing your breath</span>
    } else if (score == 0) {
        return `You were perfect! Keep it up :)`
    } else {
        return <span>You took <b>${diff}</b> less breaks than the actual artist, you can remedy this by studying more about the song, by listening</span>
    }
}

function getLengthAnalysisVerdict(score : number) {
    let diff = Math.abs(score)
    if (score > 0) {
       return <span>You sang <b>diff</b> more seconds than the actual artist, you can remedy this by studying more about this song</span>
    } else if (score == 0) {
        return `You were perfect! Keep it up :)`
    } else {
        return <span>You sang <b>diff</b> less seconds than the actual artist, you can remedy this by studying more about this song</span>
    }
}

function AudioElement({
    src,
    id,
    bgColor
}: {
    src : string,
    id : string
    bgColor: string
}) {
    let [playing, setPlaying] = useState(false);
    let [progress, setProgress] = useState(0);

    function toggleSong(playing: any, id:any, setPlaying: any) {
        var playBtn = document.getElementById(id+"-play-btn")
        var audioPlayer = document.getElementById(id)
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

    function updateProgress(id:any, setProgress: any) {
        var audioPlayer = document.getElementById(id)
        setProgress(audioPlayer.currentTime / audioPlayer.duration * 100)
    }


    let audioSrc = (
    <audio id={id} onTimeUpdate={() => {updateProgress(id, setProgress)}}>
        <source src={src} type="audio/mpeg" />
    </audio>
    )
    return (
        <div className="flex progress-bar-nonabs my-4 px-8 py-4 rounded-lg" style={{ backgroundColor: bgColor }}>
            <div className="playbtn cursor-pointer" onClick={() => toggleSong(playing,id, setPlaying)}><i id={id+"-play-btn"} className="fas fa-play"></i></div>
            <Progress value={progress} style={{ color: "#70B8DE !important", marginTop: "1.5vh", marginLeft: "2.1vw" }} />
            {audioSrc}
        </div>
    )
}

function Para({
    children
} : {
    children : any
}) {
    return (<p className="my-para font-inter">
       {children} 
    </p>)
}

function ExpositionDiv({
    children,
    bgColor
} : {
    children : any,
    bgColor : any
}) {
    return (
        <div className="flex-1 p-4">
            <div className="p-4 rounded-lg hover:drop-shadow-lg" style={{backgroundColor : bgColor}}>
                {children}
            </div>
        </div>
    )
}

function PitchComparision({
    recFreq, vocFreq,  bgColor
} : {
    recFreq : any,
    vocFreq : any,
    bgColor : string
}) {
    var inp = ""
    if (vocFreq > recFreq) {
        inp = <p className="iamsocool px-4"><b>In-case you can sing at a higher pitch, consider warming up before you sing</b><br/>
            If you wanna improve your vocal range to incorporate higher pitches, you can consider the following points:<br/>
                <b>Scales:</b> Maybe try practice singing scales (pitch high to low), this will gradually increase your vocal range over time<br/>
                <b>Sirens:</b> Sirens is a variation of Scales, for sirens one glides smoothly from low to high pitches, focusing on maintaining a clear tone, these help you in transitioning to a higher pitch<br/>
                <b>Arpeggios:</b> These excercises are for practicing a specific note, ensuring you have complete mastery of that note
            </p>
    } else {
        inp = <p className="iamsocool px-4"><b>In-case you can sing at a lower pitch, consider warming up before you sing</b><br/>
            If you wanna improve your vocal range to incorporate lower pitches, you can consider the following points:<br/>
                <b>Descending Scales:</b> Maybe try practice singing descending scales (pitch low to high), this will gradually increase your vocal range over time<br/>
                <b>Lip Trills & Humming:</b> Lip trills and humming are excellent exercises for finding your lower register and connecting with your vocal cords<br/>
            </p>
    }
    return (<div style={{color : bgColor}}>
            <h2 style={{fontSize: "3vh"}}><i>So you sung at a frequency of approximately <b>{recFreq} Hz</b> while the singer sung at a frequency of <b>{vocFreq} Hz</b></i></h2>
            <br/>
            {inp}
    </div>) 
}

function TempoComparision({
    recTempo, vocTempo,  bgColor
} : {
    recTempo : any,
    vocTempo : any,
    bgColor  : string
}) { 
    return (<div style={{color : bgColor}}>
            <h2 style={{fontSize: "3vh"}}><i>So you sung at a tempo of <b>{recTempo} BPS</b> while the singer sung at a frequency of <b>{vocTempo} BPS</b></i></h2>
            <br/>
            <p className="iamsocool px-4 pb-32 mb-32"><b>In-case you can sing at the correct tempo, consider relaxing and take a big breath before you sing</b><br/>
            If you wanna work on you dragging or rushing the lyrics, you can consider the following points:<br/>
                <b>Metronome:</b> This is the most effective way to practice and internalize the correct tempo. Start at a slow tempo and gradually increase it as you become more comfortable<br/>
                <b>Practice Specific Sections:</b> Identify specific sections where you are rushing or dragging your tempo and practice these parts<br/>
                <b>Internalize the Rythm</b>Clap, tap your foot, nod your head, try to get the feel of the beat and songs
            </p>
    </div>) 
}