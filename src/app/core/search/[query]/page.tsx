"use client"

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Search} from '../../../search'

import "../../../animate.css"

export default function App({
    params
} : {
    params : {
        query : string
    }
}){
    return (
    <Container>
        <SearchBar value={params.query}/>
        <Content query={params.query}/>
    </Container>
    )
}

function Container({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="my-container px-14">
            {children}
        </div>
    )
}

function SearchBar({
    value 
} : {
    value : string
}) {
    return (
        <input 
            onKeyUp={ e => {
                if (e.key === 'Enter') {
                    let query = document.getElementById("search-bar").value
                    window.open(`/core/search/${query}`, "_self")
                }
            }} 
            defaultValue={decodeURI(value)}
            id="search-bar"
            className="search-bar font-inter font-light width-bigg" 
            placeholder="Search Here"
        />
    )
}

function Content({
    query
} : {
    query : string
}) {
    let childrenState = useState(Array(20).fill(null));
    let searchedState = useState(0)

    Search(query, childrenState, searchedState, 5, SearchResult)
    return (<div className="result-holder pt-10">
        {childrenState[0]}
        </div>)
}

function SearchResult ({
    thumbnail,
    title,
    artist,
    id,
    idx
} : {
    thumbnail : string,
    title : string,
    artist: string,
    id : string,
    idx : number
}) {
    console.log(thumbnail)
    return (
        <Link href={`/core/sing/${id}`}>
            <div className="search-result flex flex-row p-4 m-4 rounded-xl animate__fadeIn animate__animated" id={idx.toString()}>
                <div>
                    <Image src={thumbnail} alt={title} width={196} height={196} className="rounded-xl"/>
                </div>
                <div className="px-6 search-title">
                    <h1 className='hover:underline'>{title}</h1>
                    <h2>By <span className="underline">{artist}</span></h2>
                </div>
            </div>
        </Link>)
}