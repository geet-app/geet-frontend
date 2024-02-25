"use client"
import Link from "next/link";

export default function main({
    children
} : {
    children : React.ReactNode
}) {
    return <>
        <Title/>
        <NavBar />
        {children}
        </>
}

function NavBar() {
  return ( <>
    <div className="flex nav py-8 px-14 flex-row-reverse border-b-2 border-black">
      <div className="">
        <TextButton content="Search" url="/"/>
        <TextButton content="Discover" url="/core/discover/"/>
        <TextButton content="Log In" url="/core/login" />
        <button className="my-nav-font-size font-inter mx-1 font-light bg-black hover:bg-gray-900 text-white font-bold py-1 px-5 rounded-full">
          Sign Up
        </button>
      </div>
    </div>
    </>
  );
}

function Title(){
    let redirect = () => {
        window.open("/", '_blank')
    }
    return (
        <Link className="title-drop" href="/">
            गीत.
        </Link>
    )
}

function TextButton({
  content,
  url,
} : {
  content : string,
  url : string,
}){
  return (
        <Link className={`my-nav-font-size font-inter font-light py-4 px-8 mr-1 cursor-pointer hover:underline`} href={url}>
        {content}
        </Link>
  )
}