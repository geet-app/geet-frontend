"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useState } from "react"
import "../../globals.css"
import {SERVER_URL} from "../../constants"
import "../../animate.css"

export default function Discover() {
    return (
        <Container>
            <Carousel title="POP & YOU!" genre="pop"></Carousel>
            <Carousel title="BOP 2 HIPHOP" genre="hip_hop"></Carousel>
            <Carousel title="THE ROCK" genre="rock"></Carousel>
        </Container>
    )
}

function Container({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="my-container px-14">
            {children}
        </div>
    )
}

function Carousel({
    title,
    genre
} : {
    title : string,
    genre : string
}) {
    const [children, setChildren] = useState([null,null,null,null,null]);
    const [loaded, setLoaded] = useState(0);

    (async (genre, children, setChildren, loaded, setLoaded) => {
        if (loaded > 0) {
            return
        }
        fetch(`${SERVER_URL}/recommendations/${genre}`).
        then (res => res.json()).
        then (data => {
            let next_children = children.slice()
            for (var idx = 0; idx < 5; idx++) {
                let song = data.songs[idx]
                next_children[idx] = <SongItem 
                        image_url={song.thumbnail}
                        artist={song.artist}
                        song_name={song.title}
                        color={song.bgColor}
                        href={`/core/sing/${song.song_id}`} />
            }
            setChildren(next_children)
            setLoaded(1)
        })
    })(genre, children, setChildren, loaded, setLoaded)
    return (<>
        <h1 className={`subtitle px-8 ${genre}-color`}>{title}</h1>
        <SmallCatalogue>
            <div className="empty-placeholder" style={{height: "23vw"}}></div>
            {children}
        </SmallCatalogue>
    </>)
}

function SmallCatalogue({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row  mb-24">
            {children}
        </div>
    )
}

function SongItem({
    image_url,
    song_name,
    artist,
    color,
    href
}: {
    image_url: StaticImageData,
    song_name: string,
    artist: string,
    color: string,
    href: string
}) {
    return (
        <div className="flex-1 p-4 animate__animated animate__fadeInRight">
            <Link href={href}>
                <div className="songitem-bg p-8 hover:scale-110 hover:drop-shadow-lg">
                    <Image src={image_url} className="rounded-xl" alt="song" width={256} height={256}></Image>
                    <div className="px-2 pt-4">
                        <div className="e-holder"><h1 className="songitem-h1 hover:underline">{song_name}</h1></div>
                        <div className="e-holder"><h2 className="songitem-h2">By <span className="underline">{artist}</span></h2></div>
                    </div>
                </div>
            </Link>
        </div>)
}

function SkeletonSongItem() {
    return (
        <div role="status" className="animate-pulse">
                <div className="songitem-bg p-8">
                    <div className="px-2 pt-4">
                        <div className="e-holder h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>
                </div>
        </div>)
}