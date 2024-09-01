'use client'
import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
// import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => { 
//   const {data: session} = useSession();

//   const [providers, setProviders] = useState(null);

//   const [toggleDropdown, setToggleDropdown] = useState(false);

//   useEffect(() => {
//     const setUpProviders = async () => {
//       const response = await getProviders();
//       setProviders(response);
//     };
//     setUpProviders();
//   }, []);

    let isUserConnected = false;

    const[buttonText, setbuttonText] = useState("Register");

    useEffect(() => {
        // Check if the current path is /SignIn
    if (window.location.pathname === '/Register') {
        setbuttonText('Login');
    } else {
        setbuttonText('Register');
    }
    }, []);

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     window.location.href = '/SignIn';
    // };


    const handleClick = (e) => {
        e.preventDefault();
        if(window.location.pathname === '/Register') {
            window.location.href = '/LogIn';
        } else {
            window.location.href = '/Register';
        }   
    };




  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
            src="/assets/images/internshala.jpg"
            alt="Promptopia Logo"
            width={37}
            height={37}
            className="object-contain"
            />
            <p className="logo_text">Internshala Automation</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isUserConnected ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        About Us
                    </Link>
                    <button type="button" onClick={() => signOut()} className="outline_btn">
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image
                        // src={session?.user.image}
                        src={"/assets/images/internshala.jpg"}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {/* <Link href="/SignIn" className="black_btn">
                        Sign In
                    </Link> */}
                    <Link href="/" className="black_btn mr-2">
                        Home Page   
                    </Link>

                    <Link href="/Register" onClick={handleClick} className="black_btn">
                        {buttonText}
                    </Link>
                </>
            )}

        </div>
    </nav>
  )
}

export default Nav
