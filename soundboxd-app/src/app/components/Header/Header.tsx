"use client"

import { useRouter } from "next/navigation";

export default function Header() {

    const router = useRouter();

    const Login = () => {
        router.push('./Login')
    }

    return (
        <div className="flex justify-between items-center bg-black border-solid border-b border-white w-full px-16 py-4">
            <div className="flex gap-2">
                <p className="text-4xl toledo text-white cursor-pointer">Soundboxd</p>
                <img className="w-9 animate-spin" src="images/vinyl-record-svgrepo-com (1).svg" alt="" />
            </div>

            

            <div className="flex gap-4">
                <p className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110">Search</p>
                <p className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110">Profile</p>
                <p onClick={Login} className="montserrat text-white cursor-pointer duration-300 transform hover:scale-110">Login</p>
            </div>
        </div>
    )

}

