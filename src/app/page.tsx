"use client"

import Image from "next/image";
import graphic from "../../public/graphic.png"
import Link from "next/link"
import {useState} from "react"
import "./magic.min.css"
import "./animate.css"

export default function app() {
  return <>
    <SearchBar/>
    <Graphic/>
    <NavBar/>
    <SplashScreen/>
  </>
}

function SearchBar() {
  return (
    <div className="absolute search-bar-holder animate__animated animate__fadeIn">
      <input 
        onKeyUp={ e => {
          if (e.key === 'Enter') {
            let query : HTMLElement | null = document.getElementById("search-bar").value
            window.open(`/core/search/${query}`, "_self")
          }
        }}
        type="text" 
        id="search-bar" 
        className="search-bar font-inter font-light" 
        placeholder="Search Here" />
    </div>
  )
}

function NavBar() {
  return (
    <div className="flex nav py-10 px-14 flex-row-reverse animate__fadeIn animate__animated">
      <div className="">
        <TextButton content="Discover" url="/core/discover/"/>
        <TextButton content="Log In" url="/core/login/"/>
        <button className="my-nav-font-size font-inter font-light bg-black hover:bg-gray-900 text-white font-bold py-3 px-10 rounded-full">
          Sign Up
        </button>
      </div>
    </div>
  );
}

function TextButton({
  content,
  url
} : {
  content : string,
  url : string
}){
  return (
        <Link className="my-nav-font-size font-inter font-light py-4 px-8 mr-1 cursor-pointer hover:underline" href={url}>
        {content}
        </Link>
  )
}

function Graphic() {
  return (
    <div className="animate__animated animate__fadeInLeft absolute graphic" style={{zIndex:1000}}>
      <Image alt="graphic" src={graphic}></Image> 
    </div>
  )
}

function SplashScreen(){
  let [i, setI] = useState(0);

  /*
  let initialiseAnimation = (obj : HTMLElement) => {
    console.log(obj)
    let cls="scale-in-ver-bottom"
    obj.classList.add(cls)
  }

  if (i < 3) {
    for (let obj of ["lesgo-1", "lesgo-2", "lesgo-3"]) {
      initialiseAnimation(document.getElementById(obj))
      setI(i+1)
    }
  }
  */

  return (<div className="splash-screen">
    <div className="font-raleway splash-font">
      <div className="scale-in-ver-bottom tp font-devanagri title-font" id="lesgo-1">
        गीत.
      </div>
      <p className="scale-in-ver-bottom" id="lesgo-2">SING,</p>
      <p className="scale-in-ver-bottom" id="lesgo-3">REPEAT.</p>
    </div>
  </div>)
}