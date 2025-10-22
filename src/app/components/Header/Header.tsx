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

    // Verifica autenticação quando o componente monta
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
        <div className="flex justify-between items-center bg-black border-solid border-b border-white w-full px-16 py-4">
            <div onClick={handleHome} className="flex gap-2">
                <p className="text-4xl toledo text-white cursor-pointer">Soundboxd</p>
                <img className="w-9 animate-spin" src="/images/vinyl-record-svgrepo-com (1).svg" alt="Vinyl Record" />
            </div>

            <div className="flex gap-4 items-center">
                <div 
                    className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110" 
                    onClick={() => setShow(!show)}
                >
                    {show ? 'Search' : <Input />}
                </div>
                
                {isLoggedIn ? (
                    <>
                        <p 
                            onClick={handleProfile}
                            className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110"
                        >
                            Meu Perfil
                        </p>
                        <p 
                            onClick={handleLogout}
                            className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110"
                        >
                            Logout
                        </p>
                    </>
                ) : (
                    <p 
                        onClick={handleLogin}
                        className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110"
                    >
                        Login
                    </p>
                )}
            </div>
        </div>
    )
}

