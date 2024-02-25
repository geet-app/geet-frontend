"use client"

import {SERVER_URL} from "./constants"

export async function Search(
    query : string | string[] |undefined, 
    chld: any, 
    srch: any, 
    length:number,
    Component: any
) {
    console.log("in search")
    var [children, setChildren] = chld
    var [searched, setSearched] = srch

    if (searched != 0) return;

    fetch(`${SERVER_URL}/search/${query}`).
    then (resp => resp.json()).
    then (data => {
        let newChildren = children.slice()
        for (var i=0; i<length; i++) {
            let item = data.songs[i]
            newChildren[i] = <Component
                thumbnail={item.thumbnail}
                artist={item.artist}
                id={item.song_id}
                title={item.title}
                idx={i}
            />

            /**
            setTimeout(() => {(id => {
                console.log(id)
                document.getElementById(id).classList.add("animate__fadeInUp", "animate__animated")
            })(i.toString())}, i * 500)*/
        }

        setChildren(newChildren)
        setSearched(1)
    })
}