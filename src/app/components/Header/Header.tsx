"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { isAuthenticated, clearAuthToken } from "@/lib/api";
import { routes } from "@/lib/routes";

export default function Header() {
    const [show, setShow] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    const handleLogin = () => {
        router.push(routes.login);
    }

    const handleHome = () => {
        router.push(routes.home);
    }

    const handleProfile = () => {
        if (isLoggedIn) {
            router.push(routes.myProfile);
        } else {
            router.push(routes.login);
        }
    }

    const handleLogout = () => {
        clearAuthToken();
        setIsLoggedIn(false);
        router.push(routes.home);
    }

    return (
        <div className="flex justify-between items-center bg-black border-solid border-b border-white w-full px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4">
            <div onClick={handleHome} className="flex gap-1.5 sm:gap-2 items-center">
                <p className="text-2xl sm:text-3xl md:text-4xl toledo text-white cursor-pointer">Soundboxd</p>
                <img className="w-6 sm:w-7 md:w-9 animate-spin" src="/images/vinyl-record-svgrepo-com (1).svg" alt="Vinyl Record" />
            </div>

            <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                <div className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110 text-sm sm:text-base" onClick={() => setShow(!show)}
                >
                    {show ? 'Search' : <Input />}
                </div>

                {isLoggedIn ? (
                    <>
                        <p onClick={handleProfile} className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110 text-sm sm:text-base">
                            Meu Perfil
                        </p>
                        <p onClick={handleLogout} className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110 text-sm sm:text-base">
                            Logout
                        </p>
                    </>
                ) : (
                    <p onClick={handleLogin} className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110 text-sm sm:text-base">
                        Login
                    </p>
                )}
            </div>
        </div>
    )
}

