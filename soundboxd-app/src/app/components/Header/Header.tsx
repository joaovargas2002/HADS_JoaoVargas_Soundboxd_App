"use client"

import { useRouter } from "next/navigation";
import { useState } from 'react';

import { Input } from "@/components/ui/input";

export default function Header() {

    const [show, setShow] = useState(true);

    const router = useRouter();

    const Login = () => {
        router.push('./Login')
    }

    const Home = () => {
        router.push('./')
    }

    return (
        <div className="flex justify-between items-center bg-black border-solid border-b border-white w-full px-16 py-4">
            <div onClick={Home} className="flex gap-2">
                <p className="text-4xl toledo text-white cursor-pointer">Soundboxd</p>
                <img className="w-9 animate-spin" src="images/vinyl-record-svgrepo-com (1).svg" alt="" />
            </div>

            <div className="flex gap-4">
                <p className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110" onClick={() => setShow(!show)}>{show ? !show : 'Search'}</p>
                {!show && <Input />}
                <p className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110">Profile</p>
                <p onClick={Login} className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110">Login</p>
            </div>
        </div>
    )

}

