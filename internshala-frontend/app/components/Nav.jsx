"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Register");

  useEffect(() => {
    if (window.location.pathname === "/") {
      setButtonText("Register");
    } else if (window.Location.pathname === "/LogIn") {
      setButtonText("Register");
    } else if (window.location.pathname === "/Register") {
      setButtonText("LogIn");
    } else if (window.location.pathname === "/Form") {
      setButtonText("Logout");
    } else {
      setButtonText("Register"); // Optional: Handle any other cases
    }
  }, []);

  const getLinkHref = () => {
    const pathname = window.location.pathname;

    if (pathname === "/" || pathname === "/LogIn") {
      return "/Register";
    } else if (pathname === "/Register") {
      return "/LogIn";
    } else if (pathname === "/Form") {
      return "/"; // Or handle logout logic if needed
    } else {
      return "/"; // Default link if needed
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const href = getLinkHref();
    if (href === "/") {
      // Handle logout logic here
      // For example, clear user session or redirect to home page
      window.location.href = href;
    } else {
      window.location.href = href;
    }
  };

  const isUserConnected = !!session?.user;

  // const handleClick = (e) => {
  //     e.preventDefault();
  //     window.location.href = '/SignIn';
  // };

  // const handleClick = (e) => {
  //     e.preventDefault();
  //     if(window.location.pathname === '/Register') {
  //         window.location.href = '/LogIn';
  //     } else {
  //         window.location.href = '/Register';
  //     }
  // };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/internshala.jpg"
          alt="Internshala Logo"
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
            <Link href="/Form" className="black_btn">
              About Us
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image || "/assets/images/internshala.jpg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
            <p>{session?.user?.username}</p>
          </div>
        ) : (
          <>
            <Link href="/" className="black_btn mr-2">
              Home Page
            </Link>

            {/* <Link href="/Register" onClick={handleClick} className="black_btn">
                        {buttonText}
                    </Link> */}
            <button onClick={handleClick} className="black_btn">
              {buttonText}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
