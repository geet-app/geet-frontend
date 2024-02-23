import Image from "next/image";
import graphic from "../../public/graphic.png"


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
    <div className="absolute search-bar-holder">
      <input type="text" id="search-bar" className="search-bar font-inter font-light" placeholder="Search Here"></input>
    </div>
  )
}

function NavBar() {
  return (
    <div className="flex nav py-10 px-14 flex-row-reverse">
      <div className="">
        <TextButton content="Search"/>
        <TextButton content="Leaderboard"/>
        <TextButton content="Discover"/>
        <TextButton content="Log In"/>
        <button className="my-nav-font-size font-inter font-light bg-black hover:bg-gray-900 text-white font-bold py-3 px-10 rounded-full">
          Sign Up
        </button>
      </div>
    </div>
  );
}

function TextButton({
  content 
} : {
  content : string
}){
  return (
        <span className="my-nav-font-size font-inter font-light py-4 px-8 mr-1 cursor-pointer hover:underline">
        {content}
        </span>
  )
}

function Graphic() {
  return (
    <div className="absolute graphic">
      <Image alt="graphic" src={graphic}></Image> 
    </div>
  )
}

function SplashScreen(){
  return (<div className="splash-screen">
    <p className="font-raleway splash-font">
    <span className="font-devanagri title-font">गीत.</span><br/>
    SING,<br/>
    REPEAT.
    </p>
  </div>)
}